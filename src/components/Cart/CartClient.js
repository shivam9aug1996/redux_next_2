"use client";
import {
  resetCartSlice,
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
// import LoaderFull from "../LoaderFull";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import withAuth from "../withAuth";
import withMounted from "../withMounted";
import Image from "next/image";
import CartSkeleton from "./CartSkeleton";
const Toast = dynamic(() => import("../Toast"));
const LoaderFull = dynamic(() => import("../LoaderFull"));
import { encode } from "js-base64";

// import Toast from "../Toast";

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
  const [skip, setSkip] = useState(true);
  const {
    isSuccess,
    data,
    isLoading,
    isFetching,
    isUninitialized,
    isError,
    error,
  } = useGetCartQuery({ param: userId }, { skip: !userId });

  let [paymentLoader, setPaymentLoader] = useState(false);
  let [paymentError, setPaymentError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  console.log(isSuccess3);

  useEffect(() => {
    if (isSuccess3) {
      dispatch(setCart([]));
      dispatch(resetCartSlice());
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

  console.log("mjhgfdsw456789", isUninitialized, isFetching, isLoading);
  const totalPrice = cartData.reduce((total, item) => {
    return total + item?.product?.price * item?.quantity;
  }, 0);

  const getTotalPrice = () => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.quantity * item.product.price;
    });
    return total.toFixed(2);
  };
  console.log(cartData);

  const loadScript = (scriptJs) => {
    return new Promise((res, rej) => {
      let script = document.createElement("script");
      script.src = scriptJs;
      script.onload = () => {
        res(true);
      };
      script.onerror = () => {
        res(false);
      };
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async () => {
    setPaymentLoader(true);
    let orderRes = await fetch("/api/razorpayorder", {
      method: "POST",
      body: JSON.stringify({
        amount: isChecked ? 200 : parseFloat(getTotalPrice()) * 100,
        isLive: isChecked,
      }),
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    orderRes = await orderRes?.json();
    console.log(orderRes);
    if (orderRes?.res1?.id) {
      let loaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (loaded) {
        const options = {
          key: isChecked
            ? process.env.RAZORPAY_KEY_LIVE
            : process.env.RAZORPAY_KEY,
          amount: orderRes.res1.amount,
          currency: orderRes.res1.currency,
          name: "FastBuy",
          description: "Order Payment",
          order_id: orderRes.res1.id,
          handler: async function (response) {
            // Handle the success callback
            console.log("Payment successful!", response);
            let res = await fetch("/api/verifypayment", {
              method: "POST",
              body: JSON.stringify({
                data: {
                  ...response,
                  check_order_id: orderRes.res1.id,
                  isLive: isChecked,
                },
              }),
              headers: {
                authorization: `Bearer ${token}`,
              },
            });

            res = await res?.json();

            setPaymentLoader(false);
            if (res?.verified) {
              let modifiedCartData = cartData?.map((item, index) => {
                return {
                  ...item?.product,
                  quantity: item?.quantity,
                  productId: item?.productId,
                  razorpay_order_id: orderRes.res1.id,
                };
              });
              console.log(modifiedCartData);
              createOrder({
                body: JSON.stringify(modifiedCartData),
                param: userId,
              });
            } else {
              setPaymentLoader(false);
              setPaymentError("Unauthorized payment");
            }
            console.log(res);
          },
          modal: {
            ondismiss: function () {
              console.log("Checkout form closed");
              setPaymentLoader(false);
            },
          },
          prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9876543210",
          },
          error: function (error) {
            setPaymentLoader(false);
            setPaymentError(JSON.stringify(error));
            console.log("Payment error:", error);
          },
        };
        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
      } else {
        console.error("Failed to load Razorpay script");
        setPaymentLoader(false);
        setPaymentError("Failed to load Razorpay script");
      }
    } else {
      console.error(orderRes);
      setPaymentLoader(false);
      setPaymentError(JSON.stringify(orderRes));
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {isError && <Toast message={error.error || error.data.error} />}
      {isError1 && <Toast message={error1.error || error1.data.error} />}
      {isError2 && <Toast message={error2.error || error2.data.error} />}
      {isError3 && <Toast message={error3.error || error3.data.error} />}
      {paymentError && <Toast message={paymentError} />}
      {isLoading1 || isLoading2 || isLoading3 || paymentLoader ? (
        <LoaderFull />
      ) : null}
      {isLoading && <CartSkeleton />}
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
        <ul>
          {isLoading && (
            <Skeleton height={60} count={10} style={{ marginBottom: 20 }} />
          )}
          {isSuccess &&
            cartData?.map((item, index) => {
              return (
                <li
                  key={item?.product?._id}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex flex-1">
                    <div className="border border-gray-300 rounded p-4 mr-4">
                      <div className="image-container">
                        <Image
                          src={item?.product?.image}
                          alt={item?.product?.name}
                          width={120}
                          height={170}
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(`/product/${item?.product?._id}`);
                      }}
                    >
                      {item?.product?.name}
                    </p>
                  </div>

                  <div className="flex flex-1">
                    <button
                      className="mr-2 text-sm border border-gray-300 rounded-md py-1 px-2"
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
                    <p className="text-lg">{item?.quantity}</p>

                    <button
                      className="ml-2 text-sm border border-gray-300 rounded-md py-1 px-2"
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
                  <p className="text-lg">
                    ${(item?.product?.price * item?.quantity).toFixed(2)}
                  </p>
                </li>
              );
            })}
        </ul>
        <div className="flex justify-center mt-4">
          {isSuccess && cartData?.length == 0 ? (
            <h3>{"Your cart is empty!"}</h3>
          ) : null}
          {isSuccess && cartData?.length > 0 ? (
            <button
              className="border-2 border-blue-500 rounded-lg py-2 px-4 bg-blue-500 text-white"
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
          ) : null}
        </div>
        <p className="text-xl mt-4">Total Price: ${totalPrice.toFixed(2)}</p>
      </div> */}

      <div className="flex flex-col">
        {isSuccess &&
          cartData?.map((item, index) => (
            <div
            onMouseOver={()=>{
              router.prefetch(`/product/${item?.productId}`)
            }}
              key={item?.product?._id}
              className="flex flex-col md:flex-row items-center mb-4"
            >
              <div
                className="border border-gray-300 rounded p-4 mb-4 md:mb-0 md:mr-4 cursor-pointer"
                onClick={() => {
                  router.push(`/product/${item?.productId}`);
                }}
              >
                <div className="image-container w-24 h-32 md:w-32 md:h-44">
                  <Image
                  unoptimized
                    src={item.product.image}
                    alt={item.product.name}
                    // layout="fill"
                    // objectFit="cover"
                    //loading="lazy"
                    className="fade-in"
                    priority
                    width={640}
                    height={912}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row flex-1 items-center justify-between">
                <div className="md:mr-4">
                  <p
                    onClick={() => {
                      router.push(`/product/${item?.productId}`);
                    }}
                    className="text-lg cursor-pointer"
                  >
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-600">
                  &#8377;{item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-sm border border-gray-300 rounded-md py-1 px-2 mr-2"
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
                  <p className="text-lg">{item.quantity}</p>
                  <button
                    className="text-sm border border-gray-300 rounded-md py-1 px-2 ml-2"
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
              </div>
              <div className="text-lg ml-2">
              &#8377;{item.quantity * item.product.price.toFixed(2)}
              </div>
              {/* <button
            className="text-sm border border-gray-300 rounded-md py-1 px-2 ml-2"
            onClick={() => removeItem(index)}
          >
            Remove
          </button> */}
            </div>
          ))}
        {isSuccess && cartData.length > 0 && (
          <div className="flex flex-col items-end mt-4 checkout-button">
            <p className="text-lg">Total: &#8377;{getTotalPrice()}</p>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </label>
              <span style={{ marginLeft: 5 }}>
                {"Live Mode"}
              </span>
            </div>
            <button
              onClick={async () => {
                console.log(cartData);
                await createRazorpayOrder();
                // let modifiedCartData = cartData?.map((item, index) => {
                //   return {
                //     ...item?.product,
                //     quantity: item?.quantity,
                //     productId: item?.productId,
                //   };
                // });
                // console.log(modifiedCartData);
                // createOrder({
                //   body: JSON.stringify(modifiedCartData),
                //   param: userId,
                // });
              }}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Checkout
            </button>
          </div>
        )}
        {isSuccess && cartData.length === 0 && (
          <p className="text-lg mt-4">Your cart is empty.</p>
        )}
      </div>
    </>
  );
};

export default withAuth(withMounted(CartClient));
