import React, { useEffect, useState } from 'react'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import Job from './Job'
import SkeletonJobCard from './SkeletonJobCard'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Jobs = () => {
    const { loading } = useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);

    const [filters, setFilters] = useState({ location: "", role: "", salary: "" });
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        let result = allJobs;
        if (filters.location)
            result = result.filter(job => job?.location?.toLowerCase().includes(filters.location.toLowerCase()));
        if (filters.role)
            result = result.filter(job => job?.title?.toLowerCase().includes(filters.role.toLowerCase()));
        if (filters.salary) {
            result = result.filter(job => {
                const salary = job?.salary || 0;
                if (filters.salary === "₹0 – ₹40,000") return salary <= 40000;
                if (filters.salary === "₹40,000 – ₹1,00,000") return salary > 40000 && salary <= 100000;
                if (filters.salary === "₹1,00,000+") return salary > 100000;
                return true;
            });
        }
        setFilteredJobs(result);
    }, [allJobs, filters]);

    const hasActiveFilters = filters.location || filters.role || filters.salary;
    const clearFilters = () => setFilters({ location: "", role: "", salary: "" });

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 py-10'>

                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Browse Jobs</h1>
                    <p className='text-gray-500 mt-1'>
                        {loading ? "Loading opportunities..." : `${filteredJobs.length} opportunit${filteredJobs.length === 1 ? 'y' : 'ies'} found`}
                        {!loading && hasActiveFilters && (
                            <button onClick={clearFilters} className='ml-3 text-sm text-black underline hover:no-underline'>
                                Clear filters
                            </button>
                        )}
                    </p>
                </div>

                <div className='flex gap-6'>

                    {/* FILTER SIDEBAR */}
                    <div className='w-72 flex-shrink-0'>
                        <div className='sticky top-6'>
                            <FilterCard filters={filters} setFilters={setFilters} />
                            {hasActiveFilters && !loading && (
                                <div className='mt-3 flex flex-wrap gap-2'>
                                    {filters.location && (
                                        <span className='flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full'>
                                            📍 {filters.location}
                                            <button onClick={() => setFilters(f => ({ ...f, location: "" }))} className='ml-1 hover:opacity-70'>✕</button>
                                        </span>
                                    )}
                                    {filters.role && (
                                        <span className='flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full'>
                                            💼 {filters.role}
                                            <button onClick={() => setFilters(f => ({ ...f, role: "" }))} className='ml-1 hover:opacity-70'>✕</button>
                                        </span>
                                    )}
                                    {filters.salary && (
                                        <span className='flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full'>
                                            💰 {filters.salary}
                                            <button onClick={() => setFilters(f => ({ ...f, salary: "" }))} className='ml-1 hover:opacity-70'>✕</button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* JOB GRID */}
                    <div className='flex-1'>
                        {loading ? (
                            // ✅ SKELETON GRID while loading
                            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <SkeletonJobCard key={i} />
                                ))}
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className='flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-gray-200'>
                                <p className='text-4xl mb-3'>🔍</p>
                                <p className='text-lg font-semibold text-gray-700'>No jobs match your filters</p>
                                <p className='text-sm text-gray-400 mt-1'>Try adjusting or clearing your filters</p>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className='mt-4 px-5 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition'>
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
                                {filteredJobs.map(job => <Job key={job._id} job={job} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Jobs;