import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(input).forEach(key => {
            if (input[key]) formData.append(key, input[key]);
        });

        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Signup failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) navigate("/");
    }, [user]);

    return (
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Signup</h1>

                <Input name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Full name" />
                <Input name="email" value={input.email} onChange={changeEventHandler} placeholder="Email" />
                <Input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="Phone" />
                <Input name="password" value={input.password} onChange={changeEventHandler} placeholder="Password" />

                <RadioGroup className="flex gap-4 my-5">
                    <Input type="radio" name="role" value="student" onChange={changeEventHandler} />
                    <Label>Student</Label>

                    <Input type="radio" name="role" value="recruiter" onChange={changeEventHandler} />
                    <Label>Recruiter</Label>
                </RadioGroup>

                <Input type="file" onChange={changeFileHandler} />

                {loading ? (
                    <Button className="w-full"><Loader2 className='animate-spin' /></Button>
                ) : (
                    <Button type="submit" className="w-full">Signup</Button>
                )}

                <span className='text-sm'>
                    Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Signup