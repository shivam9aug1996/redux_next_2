"use client"
import dynamic from 'next/dynamic'
 
const CartClient = dynamic(() => import('./CartClient'))
import React, { Suspense } from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
 //import CartClient from "./CartClient";
import CartClient2 from './CartClient2';
// import CartServer from "./CartServer";


const CartList = () => {
  const [isMounted,setIsMounted] = useState(false)
  useEffect(()=>{
    setIsMounted(true)
  },[])
  
  return (
    <>
      <div style={{ marginBottom: 20 }}>Cart</div>
        {/* <Suspense fallback={<Skeleton count={5} />}>
          <CartServer />
        </Suspense> */}
        {/* <CartClient/> */}
       {isMounted? <CartClient/>:null}
    </>
  );
};

export default CartList;
