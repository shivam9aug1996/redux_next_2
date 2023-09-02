"use client";
import { useGetAdminHomeQuery } from "@/redux/features/AdminHome/adminHomeSlice";
import React from "react";
import Skeleton from "react-loading-skeleton";
import DashboardSkeleton from "./DashboardSkeleton";

const Dashboard = () => {
  const { data, isLoading } = useGetAdminHomeQuery();
  console.log(data);
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        </div>
        {/* {isLoading ? (
          <DashboardSkeleton />
        ) : ( */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            {isLoading ? (
              <Skeleton height={32} width={60} />
            ) : (
              <p className="text-3xl font-semibold text-blue-500">
                {data?.categoryCount}
              </p>
            )}
            <p className="text-gray-500">Category count</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            {isLoading ? (
              <Skeleton height={32} width={60} />
            ) : (
              <p className="text-3xl font-semibold text-green-500">
                {data?.ordersCount}
              </p>
            )}
            <p className="text-gray-500">Order count</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            {isLoading ? (
              <Skeleton height={32} width={60} />
            ) : (
              <p className="text-3xl font-semibold text-yellow-500">
                {data?.productCount}
              </p>
            )}
            <p className="text-gray-500">Product count</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            {isLoading ? (
              <Skeleton height={32} width={60} />
            ) : (
              <p className="text-3xl font-semibold text-purple-500">
                {data?.usersCount}
              </p>
            )}
            <p className="text-gray-500">User count</p>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Dashboard;
