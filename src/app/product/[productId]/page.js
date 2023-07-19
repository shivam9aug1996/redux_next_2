import Image from "next/image";
import React from "react";
import Button from "./Button";
import ImageClient from "./ImageClient";

//export const dynamicParams = true

const page = async ({ params }) => {
  console.log("hi");
  let url = "";
  if (process.env.NODE_ENV == "development") {
    url = `http://localhost:3000/api/product`;
  } else {
    url = `${process.env.API_URL}api/product`;
  }
  // url = `${process.env.API_URL_PREVIEW}api/product`;
  let res = await fetch(`${url}?productId=${params.productId}`);

  //console.log(process.env.NODE_ENV,process.env.API_URL,url)
  res = await res?.json();
  await new Promise((res)=>setTimeout(() => {
    res("hi")
  }, 5000))
  const { product } = res;
  console.log("mjhgtr456789o", product);
  return (
    <div className="w-full p-4">
      <div className="border border-gray-300 rounded p-4 flex flex-col items-start">
        {/* <img
          src={product.image}
          alt={product.name}
          className="h-auto max-w-full max-h-64 mb-2 object-contain"
        /> */}
        <ImageClient product={product}/>
        {/* <Image
                  onLoad={(e) => e.target.classList.add('loaded')}
                    src={product?.image}
                    alt={product?.name}
                    width={640}
                    height={912}
                    objectFit="cover"
                    className="h-auto max-w-full max-h-64 mb-2 object-contain"
                    loading="lazy"
                    className="fade-in"
                  /> */}
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600">${product?.price?.toFixed(2)}</p>

        <Button productId={params.productId} />
      </div>
    </div>
  );
};

export default page;
