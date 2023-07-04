"use client";
import { logout, useLogoutMutation } from "@/redux/features/Auth/authSlice";
import { cartApi, useGetCartQuery } from "@/redux/features/Cart/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = ({token,userData}) => {
  const router = useRouter()
  const [logout, { isSuccess, isLoading, isError }] =
  useLogoutMutation();
  const state = useSelector((state) => state);
  console.log(state)
  //const token =state?.auth?.token
  //const name = state?.auth?.userData?.name
  const [skip, setSkip] = React.useState(true)
  const name= userData?.name
  const cartValue = state?.cart?.cartValue

  const { data  } = useGetCartQuery({param:state?.auth?.userData?.id},{skip});
  const dispatch = useDispatch();
 console.log(data)
  useEffect(()=>{
    if(isSuccess){
      router.refresh()
    }
      },[isSuccess])
      useEffect(()=>{
        setTimeout(() => {
          setSkip(false)
        }, 1000);
      },[])
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="ml-5">
          <Link
            className="font-bold text-white tracking-wide cursor-pointer"
            href="/"
          >
            My Website
          </Link>
        </div>
        {!token ? (
          <div>
            <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="text-gray-300 hover:text-white cursor-pointer mr-5"
              href="/signup"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div>
            {/* <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/"
            >
              {`Welcome ${name}`}
            </Link> */}
            <button
              onClick={() => {
                
              }}
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
            >
               {`Welcome ${name}`}
            </button>
            <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/cart"
            >
              {`Cart (${data?.cart?.length||0})`}
            </Link>
            <button
              onClick={() => {
                //dispatch(logout());
                logout()
              }}
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
