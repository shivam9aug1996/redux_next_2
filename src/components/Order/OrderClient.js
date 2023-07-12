"use client";
import { useGetOrderListQuery } from "@/redux/features/Order/orderSlice";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import Toast from "../Toast";

const OrderClient = () => {
 // const isMounted = useRef(false);
  const orderData = useSelector((state) => state?.order?.orderList || []);
  const userId = useSelector((state) => state?.auth?.userData?.id);
  const token = useSelector((state) => state?.auth?.token);
  const [skip,setSkip] = useState(true)
  const skipRef = useRef(null)
  console.log(userId);
  const { isLoading, data, isSuccess, isError, error } = useGetOrderListQuery(
    {
      param: "64a5c8b651c37ca0220a5a27",
    },
    { skip:skip}
  );
  console.log(data);
  useEffect(() => {
    if (token && userId) {
      setSkip(false);
    } else {
      setSkip(true);
    }
    
    return () => {
      setSkip(true);
    };
  }, [token, userId]);
  
  return (
    <>
      {isError && <Toast message={error.error || error.data.error} />}

      <ul>
        {isLoading && <Skeleton count={5} />}
        {isSuccess &&
          orderData?.map((item, index) => {
            return (
              <Fragment key={item?._id}>
                <div style={{ borderWidth: 1, padding: 10, margin: 10 }}>
                  <h3>{index + 1}</h3>
                  <li>{item?.date}</li>
                  <li>{item?._id}</li>
                </div>
              </Fragment>
            );
          })}
        {isSuccess && orderData?.length == 0 ? (
          <h3>{"You have placed no orders"}</h3>
        ) : null}
      </ul>
    </>
  );
};

export default OrderClient;
