import React, { Suspense } from "react";
import Button from "./Button";

export const dynamicParams = true 

const page = async ({ params }) => {
  
  let url = "";
  if (process.env.NODE_ENV == "development") {
    url = `http://localhost:3000/api/product`;
  } else if (process.env.NODE_ENV == "Production") {
    url = `${process.env.API_URL_PREVIEW}api/product`;
  }
  else {
    url = `${process.env.API_URL}api/product`;
  }
 // url = `${process.env.API_URL_PREVIEW}api/product`;
  let res = await fetch(`${url}?productId=${params.productId}`);
  console.log(process.env.NODE_ENV,process.env.API_URL,url)
  res = await res?.json();
  // await new Promise((res)=>setTimeout(() => {
  //   res("hi")
  // }, 5000))
  const { product } = res;
  return (
    <div style={{}}>
      <Suspense fallback={<div>fghj</div>}>
      <p>{product?.name}</p>
     <Button productId={params.productId}/>
      </Suspense>
     
    </div>
  );
};

export default page;