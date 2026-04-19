import React from 'react'
import { useSelector } from 'react-redux'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const statusColor = (status) => {
    switch (status) {
        case 'accepted': return 'bg-green-100 text-green-700'
        case 'rejected': return 'bg-red-100 text-red-700'
        default: return 'bg-yellow-100 text-yellow-700'
    }
}

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job)
    const navigate = useNavigate()

    if (!allAppliedJobs || allAppliedJobs.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-gray-400 text-sm'>You haven't applied to any jobs yet.</p>
                <button
                    onClick={() => navigate('/jobs')}
                    className='mt-3 text-sm text-black underline hover:no-underline'
                >
                    Browse jobs →
                </button>
            </div>
        )
    }

    return (
        <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
                <thead>
                    <tr className='border-b text-left text-gray-500'>
                        <th className='pb-3 font-medium'>Date</th>
                        <th className='pb-3 font-medium'>Job</th>
                        <th className='pb-3 font-medium'>Company</th>
                        <th className='pb-3 font-medium'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppliedJobs.map((application) => (
                        <tr
                            key={application._id}
                            className='border-b last:border-0 hover:bg-gray-50 cursor-pointer'
                            onClick={() => navigate(`/description/${application?.job?._id}`)}
                        >
                            <td className='py-3 text-gray-500'>
                                {application?.createdAt?.split("T")[0]}
                            </td>
                            <td className='py-3 font-medium text-gray-900'>
                                {application?.job?.title || "—"}
                            </td>
                            <td className='py-3 text-gray-600'>
                                {application?.job?.company?.name || "—"}
                            </td>
                            <td className='py-3'>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColor(application.status)}`}>
                                    {application.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable