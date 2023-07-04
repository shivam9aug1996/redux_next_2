import { connectDB } from "@/app/lib/connectDataBase";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import ProductClient from "./ProductClient";

const getProducts = async () => {
  let url = "";
  if (process.env.NODE_ENV == "development") {
    url = `http://localhost:3000/api/products`;
  } else {
    url = `${process.env.API_URL}api/products`;
  }
  let data = await fetch(url, {
    next: { revalidate: 0 },
  });
  data = await data?.json();
  return data;
  console.log(data);
};

const ProductServer = async () => {
  let data = await getProducts();

  //   let database = await connectDB();
  //  const collection = await database.collection("product_list");
  //  let productList = await collection.find({}).toArray();
  //  productList=productList.map((item)=>{
  //   return {...item,_id:item?._id?.toString()}
  //  })

  return (
    <>
        <ProductClient data={data?.productList} />
    </>
  );
};

export default ProductServer;
