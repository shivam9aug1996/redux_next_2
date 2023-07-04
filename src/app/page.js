import ProductList from "@/components/Products/ProductList";
import ProductServer from "@/components/Products/ProductServer";
import React, { Suspense } from "react";


const Home = () => {
  return (
    <div style={{flex:1}}>
      <ProductList/>
    </div>
  );
};

export default Home;
