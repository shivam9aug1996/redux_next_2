"use client";
import { logout, useLoginMutation, useLogoutMutation } from "@/redux/features/Auth/authSlice";
import { cartApi, useGetCartQuery } from "@/redux/features/Cart/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderFull from "./LoaderFull";
import Toast from "./Toast";

const Header = ({ token, userData }) => {
  const router = useRouter();
  const [logout, { isSuccess, isLoading, isError,error }] = useLogoutMutation();
  // const [
  //   login,
  //   {
  //     isSuccess: isSuccess2,
  //     isLoading: isLoading2,
  //     isError: isError2,
  //     error: error2,
  //   },
  // ] = useLoginMutation();
  //  const { data } = useGetCartQuery({param:userId});
  const userId = useSelector((state) => state?.auth?.userData?.id);
  const cartData = useSelector((state) => state?.cart?.cart);
  const reduxToken = useSelector((state) => state?.auth?.token);
  const reduxUserData = useSelector((state) => state?.auth?.userData);
  
  //const token =state?.auth?.token
  //const name = state?.auth?.userData?.name
  const [skip, setSkip] = useState(true);
  const name = userData?.name;
  const cartValue = cartData?.length

  const { data, isSuccess: isSuccess1,isError:isError1,error:error1 } = useGetCartQuery(
    { param: userId },
    { skip:reduxToken?false:true }
  );
  const dispatch = useDispatch();
 console.log("reduxToken",reduxToken,reduxUserData)
  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess]);

  useEffect(()=>{
    if(reduxToken){
      
      router.refresh()
    }
  },[reduxToken])
  // useEffect(() => {
  //   if (userId&&token) {
  //     setSkip(false)
  //   }else{
  //     alert("hi")
  //     setSkip(true)
  //   }
  // }, [userId,token]);
  return (
    <header className="bg-gray-800 py-4">
      {isLoading&&<LoaderFull/>}
       {isError && <Toast message={error.error || error.data.error||error.data.message} />}
       {isError1 && <Toast message={error1.error || error1.data.error||error1.data.message} />}
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
              onClick={() => {}}
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
            >
              {`Welcome ${name}`}
            </button>
            <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/cart"
            >
              {/* {`Cart (${data?.cart?.length||0})`} */}
              {`cart (${cartValue})`}
            </Link>
            <Link
              className="mr-5 text-gray-300 hover:text-white cursor-pointer"
              href="/order"
            >
              {/* {`Cart (${data?.cart?.length||0})`} */}
              {`Order`}
            </Link>
            <button
              onClick={() => {
                //dispatch(logout());
                logout();
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
