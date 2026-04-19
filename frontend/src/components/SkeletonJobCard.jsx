import React from 'react'

const SkeletonJobCard = () => {
  return (
    <div className="p-5 rounded-xl border bg-white animate-pulse space-y-4">

      <div className="flex justify-between">
        <div className="h-3 w-24 bg-gray-300 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>

      <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
      <div className="h-3 w-full bg-gray-300 rounded"></div>

      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
        <div className="h-5 w-20 bg-gray-300 rounded"></div>
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
      </div>

      <div className="flex gap-3">
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>

    </div>
  );
};

export default SkeletonJobCard;