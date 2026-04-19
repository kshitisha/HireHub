import React from 'react'
import LatestJobCards from './LatestJobCards'
import SkeletonJobCard from './SkeletonJobCard'
import { useSelector } from 'react-redux'
const SkeletonLatestCard = () => (
    <div className="p-5 rounded-xl border bg-white animate-pulse space-y-3">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded"></div>
            <div className="space-y-1">
                <div className="h-3 w-20 bg-gray-300 rounded"></div>
                <div className="h-2 w-14 bg-gray-300 rounded"></div>
            </div>
        </div>
        <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
        <div className="flex gap-2 pt-1">
            <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
            <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
            <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
        </div>
    </div>
);

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    // Use allJobs.length === 0 as proxy for loading
    // (Home.jsx calls useGetAllJobs which populates this)
    const isLoading = allJobs.length === 0;

    return (
        <div className='max-w-7xl mx-auto my-20 text-center'>
            <h1 className='text-4xl font-bold'>Featured Opportunities</h1>
            <p className='text-gray-500 mt-2 mb-10'>Handpicked roles worth your time</p>

            <div className='grid md:grid-cols-3 gap-6'>
                {isLoading ? (
                    
                    Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonLatestCard key={i} />
                    ))
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    )
}

export default LatestJobs;