import React from 'react'
import Job from './Job'
import { useSelector } from 'react-redux'

const SavedJobs = () => {
    const { savedJobs = [] } = useSelector(store => store.job)

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 py-10'>

                <div className='mb-8'>
                    <h1 className='text-3xl font-bold'>Saved Jobs</h1>
                    <p className='text-gray-500'>
                        {savedJobs.length} saved job{savedJobs.length !== 1 && 's'}
                    </p>
                </div>

                {savedJobs.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-24 bg-white rounded-xl border'>
                        <p className='text-4xl mb-3'>🔖</p>
                        <p className='text-lg font-semibold'>No saved jobs yet</p>
                        <p className='text-sm text-gray-400'>Save jobs to see them here</p>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {savedJobs.map(job => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default SavedJobs