  import ProductClient from "@/components/Products/ProductClient";
import ProductList from "@/components/Products/ProductList";
import ProductServer from "@/components/Products/ProductServer";
import ProductsSkeleton from "@/components/ServerList/ProductsSkeleton";
import ServerProductList from "@/components/ServerList/ServerProductList";
import React, { Suspense } from "react";


const Home = () => {
  return (
    <div style={{flex:1}}>
      {/* <ProductList/> */}
      <ProductClient/>
      {/* <Suspense fallback={<ProductsSkeleton/>}>
      <ServerProductList/>
      </Suspense> */}
      
    </div>
  );
};

export default Home;
