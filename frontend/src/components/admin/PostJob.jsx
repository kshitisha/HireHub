import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: 1,
        companyId: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const selectChangeHandler = (value) => {
        const selected = companies.find(c => c.name.toLowerCase() === value.toLowerCase());
        if (selected) setInput(prev => ({ ...prev, companyId: selected._id }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.companyId) {
            toast.error("Please select a company.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, {
                ...input,
                salary: Number(input.salary),
                position: Number(input.position),
                // ✅ experienceLevel stays as string ("Beginner", "2 years", etc.)
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create job.");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { label: "Job Title", name: "title", placeholder: "e.g. Senior Software Engineer" },
        { label: "Description", name: "description", placeholder: "Brief job description" },
        { label: "Requirements (comma separated)", name: "requirements", placeholder: "React, Node.js, MongoDB" },
        { label: "Salary (LPA)", name: "salary", placeholder: "e.g. 80000", type: "number" },
        { label: "Location", name: "location", placeholder: "e.g. Remote, Bangalore" },
        { label: "Job Type", name: "jobType", placeholder: "e.g. Full-time, Internship" },
        { label: "Experience Level", name: "experienceLevel", placeholder: "e.g. Beginner, Mid, Senior" },
        { label: "Number of Positions", name: "position", placeholder: "1", type: "number" },
    ];

    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <form onSubmit={submitHandler} className='bg-white p-8 border border-gray-200 shadow-sm rounded-lg'>
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Post a New Job</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {fields.map(({ label, name, placeholder, type = "text" }) => (
                        <div key={name}>
                            <Label>{label}</Label>
                            <Input
                                type={type}
                                name={name}
                                value={input[name]}
                                onChange={changeEventHandler}
                                placeholder={placeholder}
                                className="my-1"
                                required
                            />
                        </div>
                    ))}

                    <div>
                        <Label>Company</Label>
                        {companies.length > 0 ? (
                            <Select onValueChange={selectChangeHandler} required>
                                <SelectTrigger className="w-full my-1">
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {companies.map(company => (
                                            <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <p className='text-sm text-red-600 mt-1'>
                                * Please register a company first
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full mt-6 bg-black hover:bg-gray-800"
                    disabled={loading || companies.length === 0}
                >
                    {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Posting...</> : "Post Job"}
                </Button>
            </form>
        </div>
    )
}

export default PostJob