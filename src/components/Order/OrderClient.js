"use client"
import { useGetOrderListQuery } from '@/redux/features/Order/orderSlice'
import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

const OrderClient = () => {
  const orderData = useSelector((state) => state?.order?.orderList||[]);
  const userId = useSelector((state) => state?.auth?.userData?.id);
  console.log(userId)
  const {isLoading,data,isSuccess} = useGetOrderListQuery({param:userId})
  console.log(data)
  return (
    <>
     
     
    <ul>
    {isLoading&&<Skeleton count={5}/>}
      {isSuccess&&orderData?.map((item,index)=>{
        return(
          <Fragment key={item?._id}>
            
            <div style={{borderWidth:1,padding:10,margin:10}}>
            <h3>{index+1}</h3>
            <li>
              {item?.date}
            </li>
            <li>
              {item?._id}
            </li>
            </div>
          </Fragment>
        )
      })}
    </ul>
    </>
  )
}

export default OrderClient