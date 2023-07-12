import dynamic from 'next/dynamic'
 
const CartClient = dynamic(() => import('./CartClient'), {
  ssr: false,
})
import React, { Suspense } from "react";
// import CartClient from "./CartClient";
// import CartServer from "./CartServer";


const CartList = () => {
  
  return (
    <>
      <div style={{ marginBottom: 20 }}>Cart</div>
        {/* <Suspense fallback={<Skeleton count={5} />}>
          <CartServer />
        </Suspense> */}
        <CartClient/>
    </>
  );
};

export default CartList;
