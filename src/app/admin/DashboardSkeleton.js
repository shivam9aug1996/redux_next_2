"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <Skeleton height={36} width={118} />
        <Skeleton height={20} width={100} />
      </div>
      <div className="bg-green-100 p-4 rounded-lg text-center">
        <Skeleton height={36} width={118} />
        <Skeleton height={20} width={100} />
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg text-center">
        <Skeleton height={36} width={118} />
        <Skeleton height={20} width={100} />
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-center">
        <Skeleton height={36} width={118} />
        <Skeleton height={20} width={100} />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
