"use client";
import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import Button from "./Button";

// export const dynamicParams = true

const page = ({ params }) => {
  const [product, setData] = useState(null);
  // useEffect(() => {
  //   let url = `${process.env.API_URL}api/product`;
  //     let res = await fetch(`${url}?productId=${params.productId}`);
  // res = await res?.json();
  // setData(res?.product)

  // }, [])
  useEffect(() => {
   getData()
  }, []);

  const getData=async()=>{
    let  url = `http://localhost:3000/api/product`;
    let res = await fetch(`${url}?productId=${params.productId}`);
  res = await res?.json();
  console.log(res)
 setData(res?.product);
  }

  //   let url = "";
  //   if (process.env.NODE_ENV == "development") {
  //     url = `http://localhost:3000/api/product`;
  //   } else if (process.env.NODE_ENV == "Production") {
  //     url = `${process.env.API_URL_PREVIEW}api/product`;
  //   }
  //   else {
  //     url = `${process.env.API_URL}api/product`;
  //   }
  //  // url = `${process.env.API_URL_PREVIEW}api/product`;
  //   let res = await fetch(`${url}?productId=${params.productId}`);
  //   console.log(process.env.NODE_ENV,process.env.API_URL,url)
  //   res = await res?.json();
  //   // await new Promise((res)=>setTimeout(() => {
  //   //   res("hi")
  //   // }, 5000))
  //   const { product } = res;
  return (
    <div style={{}}>
      <Suspense fallback={<div>fghj</div>}>
        <p>{product?.name}</p>
        <Button productId={params.productId} />
      </Suspense>
    </div>
  );
};

export default page;
