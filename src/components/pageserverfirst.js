// "use client";
// import {
//   useGetProductsMutation,
//   useGetProductsQuery,
// } from "@/redux/features/Product/productSlice";
// import ClientComponent from "@/components/ClientComponent";
import ProductClient from "@/components/Products/ProductClient";
import React from "react";
import { connectDB } from "./lib/connectDataBase";
// import { useEffect } from "react";

const getProducts1 = async () => {
  let url=""
  if(process.env.NODE_ENV=="development"){
    url=`http://localhost:3000/api/products`
  }else{
    url=`${process.env.API_URL}api/products`
  }
  let data = await fetch(url, {
    next: { revalidate: 0 },
  });
  // await new Promise((res) => {
  //   setTimeout(() => {
  //     res("hi");
  //   }, 2000);
  // });
  data = await data?.json();
  return data;
  console.log(data);
};

const Home = async () => {
  //  const { isSuccess, data, isLoading } = useGetProductsQuery();
  // useEffect(() => {
  //   getProducts();
  // }, []);

 // let data = await getProducts1();
 let database = await connectDB();
 const collection = await database.collection("product_list");
 let productList = await collection.find({}).toArray();
 productList=productList.map((item)=>{
  return {...item,_id:item?._id?.toString()}
 })
console.log("productList",productList)
  //console.log(isLoading, isSuccess, data);
  return (
    <>
      {/* <h3>{isLoading ? "Loading" : ""}</h3> */}
      {/* <h1>ghjk</h1> */}
      <ProductClient data={productList} />
      {/* <ul>
      {productList?.map((item, index) => {
        return (
          <li key={item?._id}>
            <p>{item?.name}</p>
          </li>
        );
      })}
    </ul> */}
    </>
  );
};

export default Home;
