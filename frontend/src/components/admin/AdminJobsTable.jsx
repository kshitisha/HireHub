import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filtered = allAdminJobs.filter(job => {
            if (!searchJobByText) return true
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            )
        })
        setFilterJobs(filtered)
    }, [allAdminJobs, searchJobByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Applicants</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                                No jobs posted yet
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell className="font-medium">{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>
                                    {/* ✅ Clickable applicant count */}
                                    <button
                                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {job?.applications?.length || 0} applicant{job?.applications?.length !== 1 ? 's' : ''}
                                    </button>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36">
                                            {/* ✅ FIXED: was navigating to /admin/companies/:id before */}
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                                                className="flex items-center gap-2 cursor-pointer py-1 hover:text-black text-gray-700"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit Job</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 cursor-pointer py-1 mt-1 hover:text-black text-gray-700"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable