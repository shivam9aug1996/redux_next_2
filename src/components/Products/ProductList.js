import React, { Suspense } from "react";
import ProductClient from "./ProductClient";

const ProductList = () => {
  return (
    <>
      <div style={{ marginBottom: 20 }}>Shop Now</div>
        <ProductClient/>
    </>
  );
};

export default ProductList;
