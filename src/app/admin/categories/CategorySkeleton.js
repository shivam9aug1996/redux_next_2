import React from "react";
import Skeleton from "react-loading-skeleton";

const CategorySkeleton = () => {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          className={`flex max-w-md items-center sm:flex-row flex-col border p-5 m-5 gap-5`}
          key={index}
        >
          <Skeleton width={100} height={20} />
          <div className="flex justify-end mt-2">
            <Skeleton width={50} height={20} />
            <Skeleton width={50} height={20} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
