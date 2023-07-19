import Skeleton from "react-loading-skeleton";

const CartSkeleton = () => {
  const skeletonCount = 5; // Number of skeleton items to render

  return (
    <div className="flex flex-col">
      {[...Array(skeletonCount)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center mb-4"
        >
          <div className="border border-gray-300 rounded p-4 mb-4 md:mb-0 md:mr-4">
            <Skeleton width={120} height={170} />
          </div>
          <div className="flex flex-col md:flex-row flex-1 items-center justify-between">
            <div className="md:mr-4">
              <Skeleton width={120} height={20} />
              <Skeleton width={80} height={16} />
            </div>
            <div className="flex items-center">
              <Skeleton width={32} height={32} />
              <Skeleton width={48} height={32} className="ml-2" />
            </div>
          </div>
          <div className="text-lg ml-2">
            <Skeleton width={60} height={24} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSkeleton

