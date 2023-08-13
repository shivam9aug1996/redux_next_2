"use client";
// import Button from "@/app/product/[productId]/Button";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "@/redux/features/Cart/cartSlice";
import {
  setProductList,
  useGetProductsQuery,
} from "@/redux/features/Product/productSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
const LoaderFull = dynamic(() => import("../LoaderFull"));
const Toast = dynamic(() => import("../Toast"));
const Button = dynamic(() => import("@/app/product/[productId]/Button"));
// import LoaderFull from "../LoaderFull";
// import Toast from "../Toast";

const ProductClient = ({}) => {
  const { isSuccess, data, isLoading, isError, error } = useGetProductsQuery();
  const router = useRouter();
  console.log(data);
  // useEffect(() => {
  //  // getProducts();
  // }, []);

  const userId = useSelector((state) => state?.auth?.userData?.id);
  // const userId = state?.auth?.userData?.id;
  // console.log(userId);
  const dispatch = useDispatch();

  const ProductItemSkeleton = () => {
    const arr = new Array(20).fill(0);
    return arr?.map((item, index) => {
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

            <Skeleton width={"60%"} height={40} style={{ marginTop: "1rem" }} />
          </div>
        </div>
      );
    });
  };

  // const [
  //   addToCart,
  //   {
  //     isSuccess: isSuccess1,
  //     data: data1,
  //     isLoading: isLoading1,
  //     isError: isError1,
  //     error: error1,
  //   },
  // ] = useAddToCartMutation();
  // const cartItemsQuery = useGetCartQuery({param:userId},{skip:true});
  // const [removeFromCart, { isSuccess:isSuccess2,  isLoading:isLoading2, isError:isError2 }] =
  // useRemoveFromCartMutation();
  // useEffect(() => {
  //   // dispatch(setProductList(data));
  //   if(isSuccess1){
  //     cartItemsQuery.refetch()
  //   }

  // }, [isSuccess1]);
  const customLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-start">
        {isError && <Toast message={error?.error || error?.data?.error} />}

        {isLoading ? <ProductItemSkeleton /> : null}

        {isSuccess &&
          data?.productList?.map((item, index) => {
            return (
              <div
                key={item?._id}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 p-4"
                // onMouseOver={()=>{
                //   router.prefetch(`/product/${item?._id}`)
                // }}
              >
                <div className="border border-gray-300 rounded p-4">
                  <div
                    className="image-container cursor-pointer"
                    onClick={() => {
                      router.push(`/product/${item?._id}`);
                    }}
                  >
                    <Image
                    unoptimized
                      //onLoad={(e) => e.target.classList.add("loaded")}
                      src={item?.image}
                      alt={item?.name}
                      width={640}
                      height={912}
                      className="w-full mb-2 zoom-effect fade-in"
                      priority
                    />
                  </div>
                  {/* <div className="image-container">
                  <Image
                  onLoad={(e) => e.target.classList.add('loaded')}
                    src={item?.image}
                    alt={item?.name}
                    width={640}
                    height={912}
                    objectFit="cover"
                    className="w-full mb-2 zoom-effect"
                    loading="lazy"
                    className="fade-in"
                  />
                  </div> */}

                  <h3
                    onClick={() => {
                      router.push(`/product/${item?._id}`);
                    }}
                    className="text-lg font-semibold mb-2 cursor-pointer"
                  >
                    {item?.name}
                  </h3>
                  <p className="text-gray-600">&#8377;{item?.price.toFixed(2)}</p>

                  <Button productId={item?._id} />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductClient;
