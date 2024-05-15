import React from "react";
import Button from "./Button";
import ImageClient from "./ImageClient";

const ParticularProduct = async ({ params }) => {
  let url = "";
  if (process.env.NODE_ENV == "development") {
    url = `http://localhost:3001/api/product`;
  } else {
    url = `${process.env.API_URL}api/product`;
  }
  let res = await fetch(`${url}?productId=${params?.productId}`, {
    next: { revalidate: 60 },
  });
  res = await res?.json();
  console.log("iuytrfgh", res);
  const { product } = res;
  return (
    <div className="w-full p-4">
      <div className="border border-gray-300 rounded p-4 flex flex-col items-start">
        <ImageClient product={product} />

        <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
        <p className="text-gray-600">
          &#8377;
          {product?.price
            ? Number.parseFloat(product?.price).toFixed(2)
            : "N/A"}
        </p>
        <Button productId={params.productId} />
      </div>
    </div>
  );
};

export default ParticularProduct;
