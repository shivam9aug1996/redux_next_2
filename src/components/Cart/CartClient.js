"use client";
import {
  setCart,
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "@/redux/features/Cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/Order/orderSlice";
import { useGetProductsQuery } from "@/redux/features/Product/productSlice";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import LoaderFull from "../LoaderFull";
import { useRouter } from "next/navigation";
import Toast from "../Toast";

const CartClient = ({}) => {
  const cartData = useSelector((state) => state?.cart?.cart || []);
  const userId = useSelector((state) => state?.auth?.userData?.id);
  const token = useSelector((state) => state?.auth?.token);
  // console.log(state)
  // const userId = state?.auth?.userData?.id;
  // console.log(userId);
  const dispatch = useDispatch();
  const router = useRouter();
  const [
    addToCart,
    {
      isSuccess: isSuccess1,
      isLoading: isLoading1,
      isError: isError1,
      error: error1,
    },
  ] = useAddToCartMutation();
  const [
    removeFromCart,
    {
      isSuccess: isSuccess2,
      isLoading: isLoading2,
      isError: isError2,
      error: error2,
    },
  ] = useRemoveFromCartMutation();
  const [
    createOrder,
    {
      isSuccess: isSuccess3,
      isLoading: isLoading3,
      isError: isError3,
      error: error3,
    },
  ] = useCreateOrderMutation();
  const [skip,setSkip] = useState(true)
  const {
    isSuccess,
    data,
    isLoading,
    isFetching,
    isUninitialized,
    isError,
    error,
  } = useGetCartQuery({ param: userId },{ skip:!userId});
  
  console.log(isSuccess3);
  useEffect(() => {
    if (isSuccess3) {
      dispatch(setCart([]));
      router.push("/order");
    }
  }, [isSuccess3]);

  useEffect(() => {
    if (userId) {
      setSkip(false);
    } else {
      setSkip(true);
    }
    
    return () => {
      setSkip(true);
    };
  }, [userId]);

  console.log("mjhgfdsw456789", error1);
  return (
    <>
      {isError && <Toast message={error.error || error.data.error} />}
      {isError1 && <Toast message={error1.error || error1.data.error} />}
      {isError2 && <Toast message={error2.error || error2.data.error} />}
      {isError3 && <Toast message={error3.error || error3.data.error} />}
      {isLoading1 || isLoading2 || isLoading3 ? <LoaderFull /> : null}
      <div style={{display:"flex",flexDirection:"column"}}>
      <ul>
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
    <div style={{display:"flex",justifyContent:"center",marginTop:30}}>
      {isSuccess&&cartData?.length==0?<h3>{"Your cart is empty!"}</h3>:null}
      {isSuccess&&cartData?.length>0?
    <button
      style={{borderWidth:1,padding:10,borderRadius:10,backgroundColor:"#31505c",color:"white"}}
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
      </button>:null}
    </div>
      </div>
    </>
  );
};

export default CartClient;
