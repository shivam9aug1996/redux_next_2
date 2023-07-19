"use client";
import Image from "next/image";
import React from "react";

const ImageClient = ({product}) => {
  return (
    <Image
      onLoad={(e) => e.target.classList.add("loaded")}
      src={product?.image}
      alt={product?.name}
      width={200}
      height={285}
     // objectFit="contain"
      className="h-auto max-w-full max-h-64 mb-2 object-contain"
     // loading="lazy"
      className="fade-in"
      priority
    />
  );
};

export default ImageClient;
