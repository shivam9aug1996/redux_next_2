"use client"
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  useGetProductsQuery,
  updatePageNumber,
} from "@/redux/features/Product/productSlice";

const LoaderFull = dynamic(() => import("../LoaderFull"));
const Toast = dynamic(() => import("../Toast"));
const Button = dynamic(() => import("@/app/product/[productId]/Button"));
const InfiniteScroll = dynamic(() => import("./InfiniteScroll"));
const ProductItemSkeleton = dynamic(() => import("./ProductSkeleton"));

const ProductClient = () => {
  const pageNumber = useSelector((state) => state?.products?.pageNumber);
  const {
    isSuccess,
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetProductsQuery(["getProducts", { page: pageNumber }]);
  const isFetchingRef = useRef(null);
  const paginationDataRef = useRef(null);
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

  return (
    <div className="product-list">
      {isError && <Toast message={error?.error || error?.data?.error} />}

      {isLoading ? <ProductItemSkeleton /> : null}

      {isSuccess &&
        data.productList?.map((item, index) => (
          <div key={item?._id} className="product-item">
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
            <Link href={`/product/${item?._id}`}>
              <h3 className="product-name">{item?.name}</h3>
            </Link>
            <p className="product-price">
              &#8377;{item?.price
                ? Number.parseFloat(item?.price).toFixed(2)
                : "N/A"}
            </p>
            <Button productId={item?._id} />
          </div>
        ))}
      <InfiniteScroll
        onReachBottom={() => {
          if (
            paginationDataRef.current?.currentPage <
              paginationDataRef.current?.totalPages &&
            !isFetchingRef.current
          ) {
            dispatch(updatePageNumber());
          }
        }}
        threshold={200}
      />
      {isFetching && data?.productList?.length > 0 ? <LoaderFull /> : null}
    </div>
  );
};

export default ProductClient;
