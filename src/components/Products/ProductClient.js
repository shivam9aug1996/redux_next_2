"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  useGetProductsQuery,
  updatePageNumber,
} from "@/redux/features/Product/productSlice";
import InfiniteScroll1 from "../Infinite1";
import Toast from "../Toast";

const LoaderFull = dynamic(() => import("../LoaderFull"));
// const Toast = dynamic(() => import("../Toast"));
const Button = dynamic(() => import("@/app/product/[productId]/Button"));
const InfiniteScroll = dynamic(() => import("./InfiniteScroll"));
const ProductItemSkeleton = dynamic(() => import("./ProductSkeleton"));

const ProductClient = () => {
  const pageNumber = useSelector((state) => state?.products?.pageNumber);
  const productList = useSelector((state) => state?.products.productList);
  const paginationRes = useSelector((state) => state?.products.paginationData);
  const { isSuccess, data, isLoading, isError, error, isFetching } =
    useGetProductsQuery(["getProducts", { page: pageNumber }]);
  const isFetchingRef = useRef(null);
  const paginationDataRef = useRef(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isFetching && data) {
  //     paginationDataRef.current = data?.pagination;
  //   }
  // }, [isFetching, data]);

  // useEffect(() => {
  //   if (isFetching) {
  //     isFetchingRef.current = true;
  //   } else {
  //     isFetchingRef.current = false;
  //   }
  // }, [isFetching]);
  // console.log(isError,error)
  console.log(error);

  return (
    <InfiniteScroll1
      onReachBottom={() => {
        console.log("hi");
        if (
          paginationRes?.currentPage < paginationRes?.totalPages &&
          !isFetching &&
          !isError
        ) {
          console.log("hi99");
          dispatch(updatePageNumber());
        }
      }}
    >
      <div className="product-list">
        {isError && (
          <Toast
            message={
              error?.error || error?.data?.error || "Something went wrong"
            }
          />
        )}

        {isLoading ? <ProductItemSkeleton /> : null}

        {!isLoading &&
          productList?.map((item, index) => (
            <div key={item?._id} className="product-item">
              <div className="flex-1">
                {item?.image ? (
                  <Link href={`/product/${item?._id}`}>
                    <div className="image-container cursor-pointer">
                      <Image
                        loading={"lazy"}
                        src={item?.image}
                        alt={item?.name}
                        layout="responsive"
                        width={500}
                        height={500}
                        className="w-full h-full"
                      />
                    </div>
                  </Link>
                ) : null}
                <Link href={`/product/${item?._id}`}>
                  <h3 className="product-name">{item?.name}</h3>
                </Link>
                <p className="product-price">
                  &#8377;
                  {item?.price
                    ? Number.parseFloat(item?.price).toFixed(2)
                    : "N/A"}
                </p>
              </div>
              <div>
                {" "}
                <Button productId={item?._id} />
              </div>
            </div>
          ))}
        {/* <InfiniteScroll
        onReachBottom={() => {
          if (
            paginationDataRef.current?.currentPage <
              paginationDataRef.current?.totalPages &&
            !isFetchingRef.current&&!isError
          ) {
            dispatch(updatePageNumber());
          }
        }}
        threshold={200}
      /> */}
        {isFetching && productList?.length > 0 ? <LoaderFull /> : null}
      </div>
    </InfiniteScroll1>
  );
};

export default ProductClient;
