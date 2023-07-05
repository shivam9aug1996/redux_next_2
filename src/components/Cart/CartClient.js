"use client"
import { setCart, useAddToCartMutation, useGetCartQuery, useRemoveFromCartMutation } from '@/redux/features/Cart/cartSlice';
import { useGetProductsQuery } from '@/redux/features/Product/productSlice';
import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import LoaderFull from '../LoaderFull';

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

// useEffect(() => {
//   if (isSuccess) {
//     alert("hi")
//     dispatch(setCart(data?.cart));
//   }
// }, []);




  return (
    <>
     
    <ul>
     {isLoading1||isLoading2?<LoaderFull/>:null}
      {isLoading&&<Skeleton count={5}/>}
      {cartData?.map((item, index) => {
        return (
          <li
            key={item?.product?._id}
            style={{
              marginBottom: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex:1
            }}
          >
           <div style={{display:"flex",flex:0.5}}>
            <p>{item?.product?.name}</p>
            </div>
           
           <div style={{display:"flex",flex:0.5}}>
           <button style={{marginRight:10,fontSize:15,borderWidth:1,padding:10}} onClick={()=> removeFromCart({
                  body: JSON.stringify({
                    productId: item?.product?._id,
                  }),
                  param: userId,
                })}>-</button>
                <p style={{fontSize:20}}>{item?.quantity}</p>
           
           <button style={{marginLeft:10,fontSize:15,borderWidth:1,padding:10}} onClick={()=> addToCart({
                  body: JSON.stringify({
                    productId: item?.product?._id,
                  }),
                  param: userId,
                })}>+</button>
           </div>
           
          </li>
        );
      })}
    </ul>
    </>
  )
}

export default CartClient