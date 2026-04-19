import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
    })

    const dispatch = useDispatch()

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileHandler = (e) => {
        const file = e.target.files?.[0]
        if (file && file.type !== "application/pdf") {
            toast.error("Only PDF files are accepted.")
            return
        }
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) formData.append("file", input.file)

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setOpen(false)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Update failed.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[480px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        {[
                            { label: "Full Name", name: "fullname", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Phone Number", name: "phoneNumber", type: "text" },
                            { label: "Bio", name: "bio", type: "text" },
                            { label: "Skills (comma separated)", name: "skills", type: "text" },
                        ].map(({ label, name, type }) => (
                            <div key={name} className='grid grid-cols-4 items-center gap-4'>
                                <Label className="text-right col-span-1">{label}</Label>
                                <Input
                                    name={name}
                                    type={type}
                                    value={input[name]}
                                    onChange={changeHandler}
                                    className="col-span-3"
                                />
                            </div>
                        ))}

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right col-span-1">Resume (PDF)</Label>
                            <Input
                                type="file"
                                accept="application/pdf"
                                onChange={fileHandler}
                                className="col-span-3"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-black text-white">
                            {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...</> : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog