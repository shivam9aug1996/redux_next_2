"use client";
import { useAddToCartMutation } from "@/redux/features/Cart/cartSlice";
import { setProductList, useGetProductsQuery } from "@/redux/features/Product/productSlice";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";

const ProductClient = ({  }) => {
    const { isSuccess, data, isLoading } = useGetProductsQuery();
    console.log(data)
  // useEffect(() => {
  //  // getProducts();
  // }, []);

  const state = useSelector((state) => state);
  const userId = state?.auth?.userData?.id;
  // console.log(userId);
  // const dispatch = useDispatch();
  const [addToCart, { isSuccess:isSuccess1, data: data1, isLoading:isLoading1, isError:isError1 }] =
    useAddToCartMutation();
    // const [removeFromCart, { isSuccess:isSuccess2,  isLoading:isLoading2, isError:isError2 }] =
    // useRemoveFromCartMutation();
  // useEffect(() => {
  //   dispatch(setProductList(data));
  // }, []);

  return (
    <ul>
      {isLoading&&<Skeleton count={5}/>}
      {isSuccess&& data?.productList?.map((item, index) => {
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
            <p>{item?.name}</p>
           
            <button
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
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductClient;
