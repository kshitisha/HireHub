import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            navigate('/browse');
        }
    };

    return (
        <div className="text-center bg-black text-white py-24">
            <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4">

                {/* 🔥 YOUR CUSTOM TAGLINE */}
                <span className="mx-auto px-4 py-2 rounded-full bg-white/10 text-gray-300 text-sm">
                    Curated opportunities for intentional careers
                </span>

                <h1 className="text-5xl font-bold leading-tight">
                    Discover work that
                    <br />
                    <span className="text-gray-400">aligns with your vision</span>
                </h1>

                <p className="text-gray-400 max-w-2xl mx-auto">
                    Thoughtfully curated roles for people who care about what they build.
                </p>

                {/* SEARCH BAR */}
                <div className="flex w-full max-w-2xl mx-auto mt-6 bg-white rounded-full overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search roles, companies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-5 py-3 text-black outline-none"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="bg-black text-white px-6"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;