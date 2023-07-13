import React from "react";
import Button from "./Button";

export const dynamicParams = true 

const page = async ({ params }) => {
  let url = "";
  if (process.env.NODE_ENV == "development") {
    url = `http://localhost:3000/api/product`;
  } else {
    url = `${process.env.API_URL}api/product`;
  }
  let res = await fetch(`${url}?productId=${params.productId}`);
  res = await res?.json();
  // await new Promise((res)=>setTimeout(() => {
  //   res("hi")
  // }, 5000))
  const { product } = res;
  return (
    <div style={{}}>
      <p>{product?.name}</p>
     <Button productId={params.productId}/>
    </div>
  );
};

export default page;
