"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "./Button";
import ImageClient from "./ImageClient";

const page = async ({ params }) => {
  const [product, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // let  url = `http://localhost:3000/api/product`;
    console.log("hi");
    let url = "";
    if (process.env.NODE_ENV == "development") {
      url = `http://localhost:3000/api/product`;
    } else {
      url = `kjhg`;
    }
    let res = await fetch(`${url}?productId=${params.productId}`);
    res = await res?.json();
    console.log(res);
    setData(res?.product);
  };
  console.log(product);

  return (
    <div className="w-full p-4">
      {product ? (
        <div className="border border-gray-300 rounded p-4 flex flex-col items-start">
          <ImageClient product={product} />
          <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
          <p className="text-gray-600">&#8377;{product?.price?.toFixed(2)}</p>
          <Button productId={params.productId} />
        </div>
      ) : (
        <div className="border border-gray-300 rounded p-4 flex flex-col items-start">
          <Skeleton height={285} width={200} />

          <div className="mt-4">
            <Skeleton height={20} width={200} />
          </div>
          <div className="mt-2">
            <Skeleton height={20} width={150} />
          </div>
          <div className="mt-2">
            <Skeleton height={40} width={100} />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
