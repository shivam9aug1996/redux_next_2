"use client";
// import Button from "@/app/product/[productId]/Button";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "@/redux/features/Cart/cartSlice";
import {
  productApi,
  setProductList,
  updatePageNumber,
  useGetProductsQuery,
} from "@/redux/features/Product/productSlice";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRef } from "react";
// import ProductItemSkeleton from "./ProductSkeleton";
// import Loader from "../Loader";

const LoaderFull = dynamic(() => import("../LoaderFull"));
const Toast = dynamic(() => import("../Toast"));
const Button = dynamic(() => import("@/app/product/[productId]/Button"));
const InfiniteScroll = dynamic(() => import("./InfiniteScroll"));
const Loader = dynamic(() => import("../Loader"));
const ProductItemSkeleton = dynamic(() => import("./ProductSkeleton"));

const ProductClient = ({}) => {
  const pageNumber = useSelector((state) => state?.products?.pageNumber);
  const [productData, setProductData] = useState([]);
  const {
    isSuccess,
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isUninitialized,
  } = useGetProductsQuery(["getProducts", { page: pageNumber }]);
  const router = useRouter();
  const isFetchingRef = useRef(null);
  const paginationDataRef = useRef(null);
  const lastProductRef = useRef(null);

  console.log(",kjhgre89rdfghjk", data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFetching && data) {
      paginationDataRef.current = data?.pagination;
    }
  }, [isFetching, data]);

  useEffect(() => {
    if (isFetching) {
      isFetchingRef.current = true;
    } else {
      isFetchingRef.current = false;
    }
  }, [isFetching]);

  console.log("paginationData", paginationDataRef.current);

  console.log(productData);

  

  const customLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  console.log(
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    isUninitialized
  );

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-start">
        {isError && <Toast message={error?.error || error?.data?.error} />}

        {isLoading ? <ProductItemSkeleton /> : null}

        {isSuccess &&
          data.productList?.map((item, index) => {
            return (
              <div
                key={item?._id}
                className={`w-full sm:w-1/2 md:w-1/2 lg:w-1/4 p-4`}
              >
                <div className="border border-gray-300 rounded p-4">
                  <Link href={`/product/${item?._id}`}>
                    <div className={`image-container cursor-pointer }`}>
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        width={640}
                        height={912}
                        className={`w-full mb-2 zoom-effect ${
                          item?.isNew && !isFetching ? "fade-in" : ""
                        }`}
                        priority
                      />
                    </div>
                  </Link>

                  <Link href={`/product/${item?._id}`}>
                    <h3 className="text-lg font-semibold mb-2 cursor-pointer">
                      {item?.name}
                    </h3>
                  </Link>

                  <p className="text-gray-600">
                    &#8377;{item?.price.toFixed(2)}
                  </p>

                  <Button productId={item?._id} />
                </div>
              </div>
            );
          })}
      </div>
      <InfiniteScroll
        onReachBottom={() => {
          if (
            paginationDataRef.current?.currentPage <
              paginationDataRef.current?.totalPages &&
            isFetchingRef.current == false
          ) {
            dispatch(updatePageNumber());
            console.log("hiuytredfghjk");
          }
        }}
        threshold={200}
      />
      {isFetching && data?.productList?.length > 0 ? <LoaderFull /> : null}
    </>
  );
};

export default ProductClient;
