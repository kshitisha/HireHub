import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Pen, Mail, Phone, FileText, Briefcase, Loader2 } from "lucide-react"
import AppliedJobTable from "./AppliedJobTable"
import UpdateProfileDialog from "./UpdateProfileDialog"
import axios from "axios"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs"
import { USER_API_END_POINT } from "@/utils/constant"

const Profile = () => {
    const [open, setOpen] = useState(false)
    const [photoLoading, setPhotoLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useGetAppliedJobs()

    // Redirect if not logged in
    useEffect(() => {
        if (!user) navigate("/login")
    }, [user])

    const handleProfilePhotoChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file.")
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be under 5MB.")
            return
        }

        const formData = new FormData()
        formData.append("file", file)

        try {
            setPhotoLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/photo`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success("Profile photo updated.")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update photo.")
        } finally {
            setPhotoLoading(false)
        }
    }

    if (!user) return null

    const skills = user?.profile?.skills || []

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

                {/* PROFILE CARD */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between">

                        {/* AVATAR */}
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <Avatar className="w-20 h-20 border-2 border-gray-200">
                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                    <AvatarFallback className="bg-gray-900 text-white text-2xl font-bold">
                                        {user?.fullname?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Change photo overlay */}
                                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                                    {photoLoading
                                        ? <Loader2 className="w-5 h-5 text-white animate-spin" />
                                        : <Pen className="w-4 h-4 text-white" />
                                    }
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleProfilePhotoChange}
                                    />
                                </label>
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-gray-900">{user?.fullname}</h1>
                                <p className="text-gray-500 text-sm mt-1">
                                    {user?.profile?.bio || "No bio added yet"}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => setOpen(true)}
                            className="flex items-center gap-2"
                        >
                            <Pen className="w-4 h-4" /> Edit Profile
                        </Button>
                    </div>

                    {/* CONTACT INFO */}
                    <div className="mt-5 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{user?.phoneNumber || "Not provided"}</span>
                        </div>
                    </div>

                    {/* SKILLS */}
                    <div className="mt-5">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills</h3>
                        {skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <Badge key={i} variant="secondary">{skill}</Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">No skills added yet</p>
                        )}
                    </div>

                    {/* RESUME */}
                    <div className="mt-5">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Resume</h3>
                        {user?.profile?.resume ? (
                            <a
                                href={user.profile.resume}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                            >
                                <FileText className="w-4 h-4" />
                                {user.profile.resumeOriginalName || "View Resume"}
                            </a>
                        ) : (
                            <p className="text-sm text-gray-400">No resume uploaded</p>
                        )}
                    </div>
                </div>

                {/* TABS — Applied Jobs */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <Tabs defaultValue="applied">
                        <TabsList className="mb-4">
                            <TabsTrigger value="applied" className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Applied Jobs
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="applied">
                            <AppliedJobTable />
                        </TabsContent>
                    </Tabs>
                </div>

            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile