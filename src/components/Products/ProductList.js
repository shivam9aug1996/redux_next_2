import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import ProductClient from "./ProductClient";
import ProductServer from "./ProductServer";

const ProductList = () => {
  return (
    <>
      <div style={{ marginBottom: 20 }}>Shop Now</div>
      {/* <Suspense fallback={<Skeleton count={5} />}> */}
        <ProductClient/>
        {/* <ProductServer /> */}
      {/* </Suspense> */}
    </>
  );
};

export default ProductList;
