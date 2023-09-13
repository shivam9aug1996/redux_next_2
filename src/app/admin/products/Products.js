"use client";
import LoaderFull from "@/components/LoaderFull";
import InfiniteScroll from "@/components/Products/InfiniteScroll";
import ProductsSkeleton from "@/components/ServerList/ProductsSkeleton";
import { adminHomeApi } from "@/redux/features/AdminHome/adminHomeSlice";
import {
  updatePageNumber,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/features/Product/productSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";

const Products = () => {
  const pageNumber = useSelector((state) => state?.products?.pageNumber);
  const productList = useSelector((state) => state?.products.productList);
  const {
    isSuccess,
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isUninitialized,
  } = useGetProductsQuery(["getProducts", { page: pageNumber }]);

  const [
    deleteProduct,
    {
      isLoading: isLoading1,
      isError: isError1,
      error: error1,
      isSuccess: isSuccess1,
    },
  ] = useDeleteProductMutation();
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState({
    status: false,
    value: null,
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const isFetchingRef = useRef(null);
  const paginationDataRef = useRef(null);

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

  useEffect(() => {
    if (isSuccess1) {
      dispatch(adminHomeApi.util.invalidateTags(["admin"]));
    }
  }, [isSuccess1]);

  return (
    <>
      <div>
        {!isLoading && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-5 mb-0"
            onClick={() => setAddProduct(true)}
          >
            Add Product
          </button>
        )}

        {addProduct || editProduct?.status ? (
          <ProductForm
            setAddProduct={setAddProduct}
            setEditProduct={setEditProduct}
            editProduct={editProduct}
          />
        ) : null}
        {isLoading ? (
          <ProductsSkeleton />
        ) : (
          productList.map((item, index) => {
            // const isSelected = item?.addressId === selectedAddress?.addressId;

            return (
              <div
                className={`flex items-center sm:flex-row flex-col border p-5 m-5 gap-5`}
                key={item?._id}
              >
                <div
                  className={`w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 p-4`}
                  style={{ minWidth: 200 }}
                >
                  <div className="border border-gray-300 rounded p-4">
                    {item?.image ? (
                      <Link href={`/product/${item?._id}`}>
                        <div className={`image-container cursor-pointer }`}>
                          <Image
                            loading={"lazy"}
                            src={item?.image}
                            alt={item?.name}
                            width={640}
                            height={912}
                            className={`w-full mb-2 zoom-effect ${
                              item?.isNew && !isFetching ? "fade-in" : ""
                            }`}
                            //s priority={true}
                          />
                        </div>
                      </Link>
                    ) : null}

                    <Link href={`/product/${item?._id}`}>
                      <h3 className="text-lg font-semibold mb-2 cursor-pointer">
                        {item?.name}
                      </h3>
                    </Link>

                    <p className="text-gray-600">
                      &#8377;
                      {item?.price
                        ? Number.parseFloat(item?.price).toFixed(2)
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => {
                      setEditProduct({ status: true, value: item });
                    }}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 max-h-8"
                  >
                    Edit
                  </button>
                  <button
                    //disabled={true}
                    onClick={() => {
                      // setSelectedAddress(null);
                      deleteProduct({
                        productId: item?._id,
                      });
                    }}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 max-h-8"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
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

export default Products;
