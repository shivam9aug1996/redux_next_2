"use client";
import Button from "@/app/product/[productId]/Button";
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
import dynamic from 'next/dynamic'
const LoaderFull = dynamic(() => import('../LoaderFull'))
const Toast = dynamic(() => import('../Toast'))
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

  return (
    <>
    {/* <h1>{process.env.NODE_ENV}</h1> */}
      {isError && <Toast message={error?.error || error?.data?.error} />}
      {/* {isError1 && <Toast message={error1?.error || error1?.data?.error} />}
      {isLoading1 ? <LoaderFull /> : null} */}
      <ul>
        {isLoading && <Skeleton height={40} count={20} style={{marginBottom:20}} />}
        {isSuccess &&
          data?.productList?.map((item, index) => {
            return (
              <li
                key={item?._id}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 0.3,
                }}
              >
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/product/${item?._id}`);
                  }}
                >
                  {item?.name}
                </p>
                <Button productId={item?._id} />
                {/* <button
                  onClick={() =>
                    addToCart({
                      body: JSON.stringify({
                        productId: item?._id,
                      }),
                      param: userId,
                    })
                  }
                  style={{
                    color: "green",
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 6,
                  }}
                >
                  Add to cart
                </button> */}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ProductClient;
