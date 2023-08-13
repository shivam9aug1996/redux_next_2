import React from "react";
import Skeleton from "react-loading-skeleton";

const Loader = () => {
  return (
    <div className="w-full p-4">
      <div className="border border-gray-300 rounded p-4 flex flex-col items-start">
        <Skeleton  height={285} width={200}/>
       
       
        <div className="mt-4">
          <Skeleton height={20} width={200} />
        </div>
        <div className="mt-2">
          <Skeleton height={20} width={150} />
        </div>
        <div className="mt-2">
          <Skeleton height={40} width={100} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
