import { cookies, headers } from 'next/headers'

import React from "react";
import CartClient from "./CartClient";

const getCart = async () => {
  const token = cookies().get('token').value
  const userData = cookies().get('userData').value
  // const headersInstance = headers()
  // const authorization = headersInstance.get('authorization')
  console.log("userData",JSON.stringify(userData))
  let url = "";
  if (process.env.NODE_ENV == "development") {
    url = `http://localhost:3000/api/cart/getCart/?userId=${userData?.id}`;
  } else {
    url = `${process.env.API_URL}api/cart/getCart/?userId=${userData?.id}`;
  }
  let data = await fetch(url, {
    headers:{
      Authorization:`Bearer ${token}`
    },
    next: { revalidate: 0 },
  });
  data = await data?.json();
  return data;
};

const CartServer = async () => {
  
 
  let data = await getCart();

  console.log(data);
  return <> <CartClient data={data?.cart} /> </>;
};



export default CartServer;
