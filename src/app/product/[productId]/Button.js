"use client";
import LoaderFull from "@/components/LoaderFull";
import Toast from "@/components/Toast";
import { useAddToCartMutation } from "@/redux/features/Cart/cartSlice";
import React from "react";
import { useSelector } from "react-redux";

const Button = ({ productId }) => {
  const userId = useSelector((state) => state?.auth?.userData?.id);
  const [addToCart, { isSuccess, data, isLoading, isError, error }] =
    useAddToCartMutation();
  return (
    <>
      {isError && <Toast message={error?.error || error?.data?.error} />}
      {isLoading ? <LoaderFull /> : null}

      <button
        onClick={() => {
          console.log({
            body: JSON.stringify({
              productId,
            }),
            param: userId,
          });

          addToCart({
            body: JSON.stringify({
              productId,
            }),
            param: userId,
          });
        }}
        style={{
          color: "green",
          borderWidth: 1,
          padding: 5,
          borderRadius: 6,
        }}
      >
        Add to cart
      </button>
    </>
  );
};

export default Button;