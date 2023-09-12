"use client";
import { useGetOrderListQuery } from "@/redux/features/Order/orderSlice";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import withMounted from "../withMounted";
import withAuth from "../withAuth";

import Link from "next/link";
const Toast = dynamic(() => import("../Toast"));
//import Toast from "../Toast";

const OrderClient = () => {
  // const isMounted = useRef(false);
  const orderData = useSelector((state) => state?.order?.orderList||[]);
  const userId = useSelector((state) => state?.auth?.userData?.id);
  const token = useSelector((state) => state?.auth?.token);
  const [skip, setSkip] = useState(true);
  const skipRef = useRef(null);
  console.log(userId);
  const { isLoading, data, isSuccess, isError, error } = useGetOrderListQuery(
    {
      param: "64a5c8b651c37ca0220a5a27",
    },
    { skip: skip }
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

  console.log(orderData);

  const calculateTotalItems = (items) => {
    let totalItems = 0;

    items.forEach((item) => {
      totalItems += item.quantity;
    });

    return totalItems;
  };

  const getTotalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      dateStyle: "long",
      timeStyle: "medium",
    };

    const formattedDate = date.toLocaleString(undefined, options);
    return formattedDate;
  };

  return (
    <>
      {isError && <Toast message={error.error || error.data.error} />}

      {/* <ul>
        {isLoading && (
          <Skeleton height={100} count={10} style={{ marginBottom: 20 }} />
        )}
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
      </ul> */}
      
        

      <div className="flex flex-col">
        {isLoading &&
          [...Array(10)].map((item,index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center mb-4 border border-gray-300 rounded"
            >
              <div className="p-4 mb-4 md:mb-0 md:mr-4">
                <Skeleton width={120} height={24} />
                <Skeleton width={150} height={16} style={{ marginTop: 8 }} />
              </div>
              <div className="flex flex-col md:flex-row flex-1 items-start md:items-center justify-between">
                <div className="md:mr-4">
                  <Skeleton width={120} height={24} />
                  <Skeleton width={150} height={16} style={{ marginTop: 8 }} />
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                  {/* Additional skeleton for icons or buttons */}
                </div>
              </div>
            </div>
          ))}

        {isSuccess && orderData?.length == 0 ? (
          <div className="flex flex-col border border-gray-300 rounded justify-center items-center p-20">
            <h3>{"You have placed no orders"}</h3>
          </div>
        ) : null}

        {isSuccess &&
          orderData.map((item) => (
            // <Link href={`/order/${item?._id}`}
            <div
              key={item?._id}
              className="flex flex-col md:flex-row items-center mb-4 border border-gray-300 rounded "
            >
              <div className="p-4 mb-4 md:mb-0 md:mr-4">
                <p className="text-lg">Order ID: {item?.orderId}</p>
                <p className="text-gray-600">
                  Order Date: {formatDate(item?.date)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row flex-1 items-start md:items-center justify-between">
                <div className="md:mr-4">
                  <p className="text-lg">
                    Total Items: {calculateTotalItems(item?.items)}
                  </p>
                  <p className="text-gray-600">
                    Total Price: {getTotalPrice(item?.items)}
                  </p>
                </div>
                <div className="flex items-center mt-4 md:mt-0"></div>
              </div>
            {/* </Link> */}
            </div>
          ))}
      </div>
    </>
  );
};

export default withAuth(withMounted(OrderClient));
