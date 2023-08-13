
import React, { Suspense } from "react";
import Loader from "./loading";
import ParticularProduct from "./ParticularProduct";
// import Button from "./Button";
// import ImageClient from "./ImageClient";

//export const dynamicParams = true

const page =  ({ params }) => {
  console.log("hi");
  
  return (
  <Suspense fallback={<Loader/>}>
    <ParticularProduct params={params} />
  </Suspense>
  );
};

export default page;
