"use client";
import {
  setCart,
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "@/redux/features/Cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/Order/orderSlice";
import { useGetProductsQuery } from "@/redux/features/Product/productSlice";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import LoaderFull from "../LoaderFull";
import { useRouter } from "next/navigation";

const CartClient = ({}) => {
  const cartData = useSelector((state) => state?.cart?.cart || []);
  const userId = useSelector((state) => state?.auth?.userData?.id);

  // console.log(state)
  // const userId = state?.auth?.userData?.id;
  // console.log(userId);
  const dispatch = useDispatch();
  const router = useRouter();
  const [
    addToCart,
    { isSuccess: isSuccess1, isLoading: isLoading1, isError: isError1 },
  ] = useAddToCartMutation();
  const [
    removeFromCart,
    { isSuccess: isSuccess2, isLoading: isLoading2, isError: isError2 },
  ] = useRemoveFromCartMutation();
  const [
    createOrder,
    { isSuccess: isSuccess3, isLoading: isLoading3, isError: isError3 },
  ] = useCreateOrderMutation();
  const { isSuccess, data, isLoading, isFetching, isUninitialized } =
    useGetCartQuery({ param: userId });
  console.log(isSuccess3);
  useEffect(() => {
    if (isSuccess3) {
      dispatch(setCart([]));
      router.push("/order");
    }
  }, [isSuccess3]);

  console.log("mjhgfdsw456789",isLoading3);
  return (
    <>
      <ul>
        {isLoading1 || isLoading2 || isLoading3 ? <LoaderFull /> : null}
        {isLoading && <Skeleton count={5} />}
        {isSuccess &&
          cartData?.map((item, index) => {
            return (
              <li
                key={item?.product?._id}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <div style={{ display: "flex", flex: 0.5 }}>
                  <p>{item?.product?.name}</p>
                </div>

                <div style={{ display: "flex", flex: 0.5 }}>
                  <button
                    style={{
                      marginRight: 10,
                      fontSize: 15,
                      borderWidth: 1,
                      padding: 10,
                    }}
                    onClick={() =>
                      removeFromCart({
                        body: JSON.stringify({
                          productId: item?.product?._id,
                        }),
                        param: userId,
                      })
                    }
                  >
                    -
                  </button>
                  <p style={{ fontSize: 20 }}>{item?.quantity}</p>

                  <button
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      borderWidth: 1,
                      padding: 10,
                    }}
                    onClick={() =>
                      addToCart({
                        body: JSON.stringify({
                          productId: item?.product?._id,
                        }),
                        param: userId,
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      <button
        onClick={() => {
          console.log(cartData);
          let modifiedCartData = cartData?.map((item, index) => {
            return {
              ...item?.product,
              quantity: item?.quantity,
              productId: item?.productId,
            };
          });
          console.log(modifiedCartData);
          createOrder({
            body: JSON.stringify(modifiedCartData),
            param: userId,
          });
        }}
      >
        Place Order
      </button>
    </>
  );
};

export default CartClient;
