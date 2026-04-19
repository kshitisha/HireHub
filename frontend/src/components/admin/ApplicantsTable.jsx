import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, FileText, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setAllApplicants } from '@/redux/applicationSlice'

const statusConfig = {
    pending:  { label: 'Pending',  icon: Clock,        className: 'bg-yellow-100 text-yellow-700' },
    accepted: { label: 'Accepted', icon: CheckCircle,  className: 'bg-green-100 text-green-700'  },
    rejected: { label: 'Rejected', icon: XCircle,      className: 'bg-red-100 text-red-700'      },
}

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)
    const dispatch = useDispatch()
    const [loadingId, setLoadingId] = useState(null)

    const statusHandler = async (status, applicationId) => {
        try {
            setLoadingId(applicationId)
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
                { status: status.toLowerCase() },
                { withCredentials: true }
            )
            if (res.data.success) {
                toast.success(`Application ${status.toLowerCase()}`)

                // ✅ Update local state so UI changes immediately without refetch
                const updatedApplications = applicants.applications.map(app =>
                    app._id === applicationId
                        ? { ...app, status: status.toLowerCase() }
                        : app
                )
                dispatch(setAllApplicants({
                    ...applicants,
                    applications: updatedApplications,
                }))
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update status.")
        } finally {
            setLoadingId(null)
        }
    }

    if (!applicants?.applications?.length) {
        return (
            <div className='text-center py-16 bg-white rounded-xl border'>
                <p className='text-4xl mb-3'>👥</p>
                <p className='font-semibold text-gray-700'>No applicants yet</p>
                <p className='text-sm text-gray-400 mt-1'>Share the job to get more visibility</p>
            </div>
        )
    }

    return (
        <div className='bg-white rounded-xl border overflow-hidden'>
            <Table>
                <TableCaption className='pb-4'>
                    All applicants for this position
                </TableCaption>
                <TableHeader>
                    <TableRow className='bg-gray-50'>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.applications.map((item) => {
                        const applicant = item?.applicant
                        const status = item?.status || 'pending'
                        const { label, icon: Icon, className } = statusConfig[status] || statusConfig.pending
                        const isLoading = loadingId === item._id

                        return (
                            <TableRow key={item._id} className='hover:bg-gray-50'>

                                {/* APPLICANT NAME + PHOTO */}
                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 overflow-hidden'>
                                            {applicant?.profile?.profilePhoto
                                                ? <img src={applicant.profile.profilePhoto} alt="" className='w-full h-full object-cover' />
                                                : applicant?.fullname?.charAt(0).toUpperCase()
                                            }
                                        </div>
                                        <div>
                                            <p className='font-medium text-gray-900 text-sm'>{applicant?.fullname}</p>
                                            <p className='text-xs text-gray-400'>{applicant?.profile?.bio || '—'}</p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* CONTACT */}
                                <TableCell>
                                    <p className='text-sm text-gray-700'>{applicant?.email}</p>
                                    <p className='text-xs text-gray-400'>{applicant?.phoneNumber}</p>
                                </TableCell>

                                {/* SKILLS */}
                                <TableCell>
                                    <div className='flex flex-wrap gap-1 max-w-[160px]'>
                                        {applicant?.profile?.skills?.length > 0
                                            ? applicant.profile.skills.slice(0, 3).map((skill, i) => (
                                                <span key={i} className='px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full'>
                                                    {skill}
                                                </span>
                                            ))
                                            : <span className='text-xs text-gray-400'>—</span>
                                        }
                                        {applicant?.profile?.skills?.length > 3 && (
                                            <span className='text-xs text-gray-400'>
                                                +{applicant.profile.skills.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>

                                {/* RESUME */}
                                <TableCell>
                                    {applicant?.profile?.resume ? (
                                        <a
                                            href={applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='flex items-center gap-1 text-blue-600 hover:underline text-sm'
                                        >
                                            <FileText className='w-3.5 h-3.5' />
                                            {applicant.profile.resumeOriginalName
                                                ? applicant.profile.resumeOriginalName.slice(0, 12) + '...'
                                                : 'View'
                                            }
                                            <ExternalLink className='w-3 h-3' />
                                        </a>
                                    ) : (
                                        <span className='text-xs text-gray-400'>No resume</span>
                                    )}
                                </TableCell>

                                {/* DATE */}
                                <TableCell className='text-sm text-gray-500'>
                                    {item?.createdAt?.split("T")[0]}
                                </TableCell>

                                {/* STATUS BADGE */}
                                <TableCell>
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}>
                                        <Icon className='w-3 h-3' />
                                        {label}
                                    </span>
                                </TableCell>

                                {/* ACTION */}
                                <TableCell className="text-right">
                                    {status === 'pending' ? (
                                        <Popover>
                                            <PopoverTrigger disabled={isLoading}>
                                                <MoreHorizontal className={`cursor-pointer ${isLoading ? 'opacity-40' : ''}`} />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-36 p-2">
                                                <button
                                                    onClick={() => statusHandler('Accepted', item._id)}
                                                    className='w-full flex items-center gap-2 px-2 py-1.5 text-sm text-green-700 hover:bg-green-50 rounded cursor-pointer'
                                                >
                                                    <CheckCircle className='w-4 h-4' />
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => statusHandler('Rejected', item._id)}
                                                    className='w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-700 hover:bg-red-50 rounded cursor-pointer mt-1'
                                                >
                                                    <XCircle className='w-4 h-4' />
                                                    Reject
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    ) : (
                                        <span className='text-xs text-gray-400'>Done</span>
                                    )}
                                </TableCell>

                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable