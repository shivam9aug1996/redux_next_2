import dynamic from 'next/dynamic'
import React from "react";
// import OrderClient from "./OrderClient";
const OrderClient = dynamic(() => import('./OrderClient'), {
  ssr: false,
})
const OrderList = () => {
  return (
    <>
      <div style={{ marginBottom: 20 }}>Order</div>
      <OrderClient />
    </>
  );
};

export default OrderList;
