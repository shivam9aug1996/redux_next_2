"use client"
import { setCart, useAddToCartMutation, useGetCartQuery, useRemoveFromCartMutation } from '@/redux/features/Cart/cartSlice';
import { useGetProductsQuery } from '@/redux/features/Product/productSlice';
import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';

const CartClient = ({}) => {
   const state = useSelector((state) => state);
   const cartData = state?.cart?.cart
  // console.log(state)
   const userId = state?.auth?.userData?.id;
  // console.log(userId);
   const dispatch = useDispatch();
  const [addToCart, { isSuccess:isSuccess1,  isLoading:isLoading1, isError:isError1 }] =
  useAddToCartMutation();
  const [removeFromCart, { isSuccess:isSuccess2,  isLoading:isLoading2, isError:isError2 }] =
  useRemoveFromCartMutation();
   const { isSuccess, data, isLoading,isFetching,isUninitialized } = useGetCartQuery({param:userId});
 // const getItemQuery = useGetCartQuery({param:userId});
  console.log(cartData)
// useEffect(() => {
//   const getItem = async (id) => {
//     await getItemQuery.refetch(id);
//     // Handle success or error
//     const item = getItemQuery.data;
//     console.log(item)
//   };
//   getItem()
  
// }, [])


  return (
    <ul>
      {isLoading&&<Skeleton count={5}/>}
      {data?.cart?.map((item, index) => {
        return (
          <li
            key={item?.product?._id}
            style={{
              marginBottom: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 0.3,
            }}
          >
            <p>{item?.product?.name}</p>
            {item?.quantity>0}
           <>
           <button onClick={()=> removeFromCart({
                  body: JSON.stringify({
                    productId: item?.product?._id,
                  }),
                  param: userId,
                })}>-</button>
           <p>{item?.quantity}</p>
            <button onClick={()=> addToCart({
                  body: JSON.stringify({
                    productId: item?.product?._id,
                  }),
                  param: userId,
                })}>+</button>
           </>
           
          </li>
        );
      })}
    </ul>
  )
}

export default CartClient