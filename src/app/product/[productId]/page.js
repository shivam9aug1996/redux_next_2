
import React, { Suspense } from "react";
import Check from "./Check";
import Loader from "./loading";
// import ParticularProduct from "./ParticularProduct";
// import Button from "./Button";
// import ImageClient from "./ImageClient";

//export const dynamicParams = true

const page =  ({ params }) => {
  console.log("hi");
  
  return (
  <Suspense fallback={<div>loading..</div>}>
    {/* <ParticularProduct params={params} /> */}
    <Check/>
  </Suspense>
  );
};

export default page;
