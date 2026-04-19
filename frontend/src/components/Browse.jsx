import React, { useEffect } from 'react'
import Job from './Job'
import SkeletonJobCard from './SkeletonJobCard'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import Footer from './shared/Footer'

const Browse = () => {
    const { loading } = useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    return (
        <div>
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-2xl my-10 text-center'>
                    {loading
                        ? "Finding opportunities..."
                        : allJobs.length === 0
                            ? "No matching roles found"
                            : `Showing ${allJobs.length} opportunities`}
                </h1>

                {loading ? (
                    
                    <div className='grid md:grid-cols-3 gap-6'>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonJobCard key={i} />
                        ))}
                    </div>
                ) : (
                    <div className='grid md:grid-cols-3 gap-6'>
                        {allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Browse;