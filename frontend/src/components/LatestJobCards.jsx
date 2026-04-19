import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const getFallbackLogo = (name = "Company") =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=ffffff&bold=true&size=128`;

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const companyName = job?.company?.name || "Company";

    
    const logo = job?.company?.logo || getFallbackLogo(companyName);

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow-md cursor-pointer'
        >
            <div className='flex items-center gap-3'>
                <img
                    src={logo}
                    alt={`${companyName} logo`}
                    className='w-10 h-10 rounded object-contain border'
                    onError={(e) => {
                        
                        e.target.onerror = null;
                        e.target.src = getFallbackLogo(companyName);
                    }}
                />
                <div>
                    <h1 className='font-medium text-black'>{companyName}</h1>
                    <p className='text-sm text-gray-500'>{job?.location || "India"}</p>
                </div>
            </div>

            <h1 className='font-bold text-lg mt-4'>{job?.title}</h1>

            <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
                {job?.description}
            </p>

            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge variant="outline">{job?.position} Positions</Badge>
                <Badge variant="outline">{job?.jobType}</Badge>
                <Badge variant="outline">₹{job?.salary?.toLocaleString()} LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;