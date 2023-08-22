"use client";
import { checkProductIsInCart } from "@/app/utils/globalFunctions";
import LoaderFull from "@/components/LoaderFull";
import Toast from "@/components/Toast";
import { useAddToCartMutation } from "@/redux/features/Cart/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Button = ({ productId }) => {
  const router = useRouter();
  const userId = useSelector((state) => state?.auth?.userData?.id);
  const [addToCart, { isSuccess, data, isLoading, isError, error }] =
    useAddToCartMutation();
  const cartData = useSelector((state) => state?.cart?.cart || []);
  const [productInCart, setProductInCart] = useState(false);

  useEffect(() => {
    if (checkProductIsInCart(cartData, productId) && userId) {
      setProductInCart(true);
    } else {
      setProductInCart(false);
    }
  }, [cartData]);

  // const checkProductIsInCart = (cartData,productId) => {
  //   let data = cartData?.filter((item, index) => {
  //     return productId == item?.product._id;
  //   });
  //   if (data?.length > 0) return true;
  //   else return false;
  // };

  const handleClick = (e) => {
    e.stopPropagation();
    console.log({
      body: JSON.stringify({
        productId,
      }),
      param: userId,
    });
    if (productInCart) {
      router.push("/cart");
    } else {
      addToCart({
        body: JSON.stringify({
          productId,
        }),
        param: userId,
      });
    }
  };

  return (
    <>
      {isError && <Toast message={error?.error || error?.data?.error} />}
      {isLoading ? <LoaderFull /> : null}
      {productInCart ? (
        <Link href={"/cart"}>
          <button
            onClick={(e) => {}}
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4`}
          >
            {"Go to cart"}
          </button>
        </Link>
      ) : (
        <button
          onClick={(e) => {
            handleClick(e);
          }}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4`}
        >
          {"Add to Cart"}
        </button>
      )}
    </>
  );
};

export default Button;
