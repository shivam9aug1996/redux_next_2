import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductsSkeleton = () => {
  const arr = new Array(20).fill(0);
  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {arr?.map((item, index) => {
        return (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="border border-gray-300 rounded p-4">
              <Skeleton height={0} style={{ paddingBottom: "140%" }} />
              <h3 className="text-lg font-semibold mb-2 mt-5">
                <Skeleton width={"60%"} height={20} />
              </h3>
              <p className="text-gray-600">
                <Skeleton width={"40%"} height={20} />
              </p>

              <Skeleton
                width={"60%"}
                height={40}
                style={{ marginTop: "1rem" }}
              />
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default ProductsSkeleton;
