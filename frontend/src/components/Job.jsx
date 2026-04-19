import React from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveJob, unsaveJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { SAVED_API_END_POINT } from '@/utils/constant'

const Job = ({ job }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { savedJobs = [] } = useSelector(store => store.job);

    const safeJob = job || {};

    const isSaved = savedJobs.some(savedJob => savedJob._id === safeJob._id);

    
    const getDaysAgo = (date) => {
        if (!date) return "New";

        const createdAt = new Date(date);
        const now = new Date();

        const diff = now - createdAt;

        if (isNaN(diff)) return "New";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return days === 0 ? "Today" : `${days} days ago`;
    };

    
    const companyName = safeJob?.company?.name || "Company";
    const title = safeJob?.title || "Untitled Role";
    const salary = safeJob?.salary || "--";
    const position = safeJob?.position || "--";
    const jobType = safeJob?.jobType || "N/A";
    const location = safeJob?.location || "India";

    const logo =
        safeJob?.company?.logo ||
        `https://ui-avatars.com/api/?name=${companyName}&background=000000&color=ffffff`;

    const handleSaveToggle = async () => {
        try {
            const response = await axios.post(
                `${SAVED_API_END_POINT}/toggle/${safeJob._id}`,
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                if (isSaved) {
                    dispatch(unsaveJob(safeJob._id));
                    toast.success("Removed from saved");
                } else {
                    dispatch(saveJob(safeJob));
                    toast.success("Saved successfully");
                }
            }
        } catch (error) {
            toast.error("Error saving job");
        }
    };

    return (
        <div className='p-5 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow-md transition-all'>

            {/* TIME */}
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {getDaysAgo(safeJob?.createdAt)}
                </p>

                <Button
                    variant="outline"
                    className="rounded-full"
                    size="icon"
                    onClick={handleSaveToggle}
                >
                    {isSaved
                        ? <BookmarkCheck className="w-4 h-4 text-black" />
                        : <Bookmark className="w-4 h-4" />}
                </Button>
            </div>

            {/* COMPANY */}
<div className='flex items-center gap-3 my-4'>
    <Avatar className="w-12 h-12 border">
        <AvatarImage
            src={logo}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${companyName}&background=000000&color=ffffff`;
            }}
        />
        <AvatarFallback>
            {companyName.charAt(0)}
        </AvatarFallback>
    </Avatar>

                <div>
                    <h1
                        className='font-semibold text-black cursor-pointer hover:underline'
                        onClick={() => navigate(`/company/${safeJob?.company?._id}`)}
                    >
                        {companyName}
                    </h1>
                    <p className='text-sm text-gray-500'>
                        {location}
                    </p>
                </div>
            </div>

            {/* JOB */}
            <h1 className='font-bold text-lg mb-2'>{title}</h1>

            <p className='text-sm text-gray-600 line-clamp-2'>
                {safeJob?.description || "No description available"}
            </p>

            {/* TAGS */}
            <div className='flex gap-2 mt-4'>
                <Badge variant="outline">{position} Positions</Badge>
                <Badge variant="outline">{jobType}</Badge>
                <Badge variant="outline">{salary} LPA</Badge>
            </div>

            {/* BUTTONS */}
            <div className='flex gap-3 mt-5'>
                <Button
                    variant="outline"
                    onClick={() => navigate(`/description/${safeJob?._id}`)}
                >
                    Details
                </Button>

                <Button
                    onClick={handleSaveToggle}
                    className="bg-black text-white hover:bg-gray-800"
                >
                    {isSaved ? 'Saved ✓' : 'Save'}
                </Button>
            </div>

        </div>
    )
}

export default Job