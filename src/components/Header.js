"use client";
import { logout, useLoginMutation, useLogoutMutation } from "@/redux/features/Auth/authSlice";
import { cartApi, resetCartSlice, setCart, useGetCartQuery } from "@/redux/features/Cart/cartSlice";
import { orderApi, setOrder } from "@/redux/features/Order/orderSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from 'next/dynamic'
const Toast = dynamic(() => import('./Toast'))
const LoaderFull = dynamic(() => import('./LoaderFull'))
// import LoaderFull from "./LoaderFull";
// import Toast from "./Toast";

const Header = ({ token, userData }) => {
 // const userId = useSelector((state) => state?.auth?.userData?.id);
  const cartData = useSelector((state) => state?.cart?.cart);
  const reduxToken = useSelector((state) => state?.auth?.token);
  const reduxUserData = useSelector((state) => state?.auth?.userData);

 
  const [logout, { isSuccess, isLoading, isError,error }] = useLogoutMutation();
  
  const [skip, setSkip] = useState(true);
  //const name = userData?.name;


  const { data, isSuccess: isSuccess1,isError:isError1,error:error1 } = useGetCartQuery(
    { param: reduxUserData?.id },
    { skip:!reduxUserData?.id }
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const cartValue = cartData?.length

  useEffect(() => {
    if (isSuccess) {
        
     
         // router.push("/")
          // setTimeout(() => {
             dispatch(cartApi.util.resetApiState())
             dispatch(orderApi.util.resetApiState())
             dispatch(resetCartSlice())
          // }, 2000);
        
    }
  }, [isSuccess]);

  // useEffect(()=>{
  //   if(reduxToken){
      
  //     router.refresh()
  //   }
  // },[reduxToken])
  useEffect(() => {
    if ( reduxUserData) {
      setSkip(false);
    } else {
      setSkip(true);
    }
    
    return () => {
      setSkip(true);
    };
  }, [ reduxUserData]);
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
        {!reduxToken ? (
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
              {`Welcome ${reduxUserData?.name}`}
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
                
        //         dispatch(setCart([]))
        // dispatch(setOrder([]))
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
