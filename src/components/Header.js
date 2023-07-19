"use client";
import {
  logout,
  useLoginMutation,
  useLogoutMutation,
} from "@/redux/features/Auth/authSlice";
import {
  cartApi,
  resetCartSlice,
  setCart,
  useGetCartQuery,
} from "@/redux/features/Cart/cartSlice";
import { orderApi, setOrder } from "@/redux/features/Order/orderSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
const Toast = dynamic(() => import("./Toast"));
const LoaderFull = dynamic(() => import("./LoaderFull"));
// import LoaderFull from "./LoaderFull";
// import Toast from "./Toast";

const Header = () => {
  const currentUrl = usePathname()
  // const userId = useSelector((state) => state?.auth?.userData?.id);
  const cartData = useSelector((state) => state?.cart?.cart);
  const cartValue = useSelector((state) => state?.cart?.cartValue);
  const reduxToken = useSelector((state) => state?.auth?.token);
  const reduxUserData = useSelector((state) => state?.auth?.userData);

  const [logout, { isSuccess, isLoading, isError, error }] =
    useLogoutMutation();

  const [skip, setSkip] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  //const name = userData?.name;
console.log(cartValue)
  const {
    data,
    isSuccess: isSuccess1,
    isError: isError1,
    error: error1,
  } = useGetCartQuery(
    { param: reduxUserData?.id },
    { skip: reduxUserData?.id && reduxToken && isMounted ? false : true }
  );
  const router = useRouter();
  const dispatch = useDispatch();
 // const cartValue = cartData?.length;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(cartApi.util.resetApiState());
  //     dispatch(orderApi.util.resetApiState());
  //     dispatch(resetCartSlice());
  //   }
  // }, [isSuccess]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(cartApi.util.resetApiState());
      dispatch(orderApi.util.resetApiState());
      dispatch(resetCartSlice());
      setSkip(true); // Set skip to true to prevent additional queries
      router.replace("/");
    }
  }, [isSuccess, dispatch]);

  // useEffect(()=>{
  //   if(reduxToken){

  //     router.refresh()
  //   }
  // },[reduxToken])
  // useEffect(() => {
  //   if (reduxUserData&&isMounted&&reduxToken) {
  //     setSkip(false);
  //   } else {
  //     setSkip(true);
  //   }

  //   return () => {
  //     setSkip(true);
  //   };
  // }, [reduxUserData,isMounted]);

  useEffect(() => {
    if (!reduxUserData || !reduxToken) {
      setSkip(true);
    }
    if (reduxUserData && reduxToken && isMounted && !isSuccess) {
      setSkip(false);
    }
  }, [reduxUserData, reduxToken, isMounted, isSuccess]);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
console.log(currentUrl)
  return (
    <header className="bg-gray-800 py-4 sticky z-30" style={{top:-1}}>
      {isLoading && <LoaderFull />}
      {isError && (
        <Toast
          message={error.error || error.data.error || error.data.message}
        />
      )}
      {isError1 && (
        <Toast
          message={error1.error || error1.data.error || error1.data.message}
        />
      )}
      <nav className="container mx-auto flex justify-between items-center">
        <div className="ml-5">
          <Link
            className="font-bold text-white tracking-wide cursor-pointer"
            href="/"
          >
            FastBuy
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          {reduxToken && isMounted ? (
            <div>
              <button
                onClick={() => {}}
                className="mr-5 text-gray-300 cursor-text"
                style={{color:"skyblue"}}
              >
                {`Welcome ${reduxUserData?.name}`}
              </button>
              <Link
                className={ currentUrl=="/cart"?`mr-5 text-red-300 hover:text-red cursor-pointer`:`mr-5 text-gray-300 hover:text-white cursor-pointer`}
                href="/cart"
                
              >
                {`Cart (${cartValue})`}
              </Link>
              <Link
                className={ currentUrl=="/order"?`mr-5 text-red-300 hover:text-red cursor-pointer`:`mr-5 text-gray-300 hover:text-white cursor-pointer`}
                href="/order"
              >
                {`Order`}
              </Link>
              <button
                onClick={() => {
                  logout();
                }}
                className={`mr-5 text-gray-300 hover:text-white cursor-pointer`}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link
                className={ currentUrl=="/login"?`mr-5 text-red-300 hover:text-red cursor-pointer`:`mr-5 text-gray-300 hover:text-white cursor-pointer`}
                href="/login"
              >
                Login
              </Link>
              <Link
                className={ currentUrl=="/signup"?`mr-5 text-red-300 hover:text-red cursor-pointer`:`mr-5 text-gray-300 hover:text-white cursor-pointer`}
                href="/signup"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center mr-3">
          <button
            onClick={handleMenuToggle}
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2 px-4">
          <div className="flex flex-col">
            {reduxToken && isMounted ? (
              <div>
                <button
                  onClick={() => {}}
                  className="mr-5 text-gray-300 cursor-text" style={{color:"skyblue"}}
                >
                  {`Welcome ${reduxUserData?.name}`}
                </button>
                <Link
                  className={ currentUrl=="/cart"?`mr-5 text-red-300 hover:text-red cursor-pointer`:`mr-5 text-gray-300 hover:text-white cursor-pointer`}
                  href="/cart"
                >
                  {`Cart (${cartValue})`}
                </Link>
                <Link
                  className={ currentUrl=="/order"?`mr-5 text-red-300 hover:text-red cursor-pointer`:`mr-5 text-gray-300 hover:text-white cursor-pointer`}
                  href="/order"
                >
                  {`Order`}
                </Link>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className={`mr-5 text-gray-300 hover:text-white cursor-pointer`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  className={ currentUrl=="/login"?`mr-5 text-red-300 hover:text-red cursor-pointer`:`mr-5 text-gray-300 hover:text-white cursor-pointer`}
                  href="/login"
                >
                  Login
                </Link>
                <Link
                   className={ currentUrl=="/signup"?`mr-5 text-red-300 hover:text-red cursor-pointer`:`mr-5 text-gray-300 hover:text-white cursor-pointer`}
                  href="/signup"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
