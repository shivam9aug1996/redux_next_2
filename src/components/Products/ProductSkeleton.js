import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductItemSkeleton = () => {
  const arr = new Array(20).fill(0);
  return arr?.map((item, index) => {
    return (
      <div key={index} className="product-item">
        
          <Skeleton className={"image-container"} height={253.89}/>
         
            <Skeleton className="product-name" height={"80%"} style={{marginTop:10}}  />
        
          
            <Skeleton width={"40%"} className="product-price" height={"80%"} style={{marginTop:10}} />
         

          <Skeleton className={` text-white font-bold py-2 px-4 rounded mt-4`} />
        
      </div>
    );
  });
};

export default ProductItemSkeleton;
