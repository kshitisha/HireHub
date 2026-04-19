import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Loader2, MapPin, Briefcase, DollarSign, Calendar, Users } from 'lucide-react'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const [isApplied, setIsApplied] = useState(false)
    const [applying, setApplying] = useState(false)

    const { id: jobId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    // Check if current user already applied
                    const alreadyApplied = res.data.job.applications?.some(
                        (app) => app.applicant === user?._id || app.applicant?._id === user?._id
                    )
                    setIsApplied(alreadyApplied || false)
                }
            } catch (error) {
                console.error("Fetch job error:", error)
                toast.error("Failed to load job details.")
            }
        }
        fetchJob()
    }, [jobId, dispatch, user?._id])

    const applyJobHandler = async () => {
        if (!user) {
            toast.error("Please login to apply.")
            navigate("/login")
            return
        }

        try {
            setApplying(true)
            const res = await axios.post(   // ✅ POST not GET
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                {},
                { withCredentials: true }
            )
            if (res.data.success) {
                setIsApplied(true)
                dispatch(setSingleJob({
                    ...singleJob,
                    applications: [...(singleJob.applications || []), { applicant: user._id }],
                }))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to apply.")
        } finally {
            setApplying(false)
        }
    }

    if (!singleJob) {
        return (
            <div className="flex justify-center items-center py-32">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        )
    }

    return (
        <div className='max-w-4xl mx-auto my-10 px-4'>

            {/* HEADER */}
            <div className='flex items-start justify-between gap-4 mb-6'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-900'>{singleJob?.title}</h1>

                    <div className='flex flex-wrap items-center gap-2 mt-3'>
                        <Badge variant="outline" className='text-blue-700 font-semibold'>
                            {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
                        </Badge>
                        <Badge variant="outline" className='text-orange-600 font-semibold'>
                            {singleJob?.jobType}
                        </Badge>
                        <Badge variant="outline" className='text-purple-700 font-semibold'>
                            ₹{singleJob?.salary?.toLocaleString()} LPA
                        </Badge>
                    </div>

                    <button
                        onClick={() => navigate(`/company/${singleJob?.company?._id}`)}
                        className='mt-2 text-sm text-gray-500 hover:underline'
                    >
                        {singleJob?.company?.name}
                    </button>
                </div>

                <Button
                    onClick={isApplied ? undefined : applyJobHandler}
                    disabled={isApplied || applying}
                    className={`rounded-lg min-w-[120px] ${isApplied
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-black hover:bg-gray-800'
                        }`}
                >
                    {applying ? (
                        <><Loader2 className='w-4 h-4 animate-spin mr-2' /> Applying...</>
                    ) : isApplied ? (
                        'Applied ✓'
                    ) : (
                        'Apply Now'
                    )}
                </Button>
            </div>

            {/* DETAILS */}
            <div className='bg-white border border-gray-200 rounded-xl p-6 space-y-4'>
                <h2 className='font-semibold text-lg border-b pb-3'>Job Details</h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                    <div className='flex items-center gap-2'>
                        <MapPin className='w-4 h-4 text-gray-400' />
                        <span className='font-medium'>Location:</span>
                        <span className='text-gray-600'>{singleJob?.location}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Briefcase className='w-4 h-4 text-gray-400' />
                        <span className='font-medium'>Experience:</span>
                        <span className='text-gray-600'>{singleJob?.experienceLevel}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <DollarSign className='w-4 h-4 text-gray-400' />
                        <span className='font-medium'>Salary:</span>
                        <span className='text-gray-600'>₹{singleJob?.salary?.toLocaleString()} LPA</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Users className='w-4 h-4 text-gray-400' />
                        <span className='font-medium'>Applicants:</span>
                        <span className='text-gray-600'>{singleJob?.applications?.length || 0}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4 text-gray-400' />
                        <span className='font-medium'>Posted:</span>
                        <span className='text-gray-600'>{singleJob?.createdAt?.split("T")[0]}</span>
                    </div>
                </div>

                <div className='pt-2'>
                    <h3 className='font-medium mb-2'>Description</h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>{singleJob?.description}</p>
                </div>

                {singleJob?.requirements?.length > 0 && (
                    <div>
                        <h3 className='font-medium mb-2'>Requirements</h3>
                        <div className='flex flex-wrap gap-2'>
                            {singleJob.requirements.map((req, i) => (
                                <Badge key={i} variant="secondary">{req}</Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobDescription