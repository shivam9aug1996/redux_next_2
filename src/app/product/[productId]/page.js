import Image from "next/image";
import React from "react";
import Button from "./Button";
import ImageClient from "./ImageClient";

const page = async ({ params }) => {
  console.log("hi");
  let url = "";
  if (process.env.NODE_ENV == "development") {
    url = `http://localhost:3000/api/product`;
  } else {
    url = `${process.env.API_URL}api/product`;
  }
  let res = await fetch(`api/product?productId=${params.productId}`);

  res = await res?.json();
  const { product } = res;
  console.log("mjhgtr456789o", product);
  return (
    <div className="w-full p-4">
      <div className="border border-gray-300 rounded p-4 flex flex-col items-start">
        <ImageClient product={product} />
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600">&#8377;{product?.price?.toFixed(2)}</p>
        <Button productId={params.productId} />
      </div>
    </div>
  );
};

export default page;
