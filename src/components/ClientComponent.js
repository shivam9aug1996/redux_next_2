"use client";
import React from "react";

const ClientComponent = ({ data }) => {
  return (
    <ul>
      {data?.productList?.map((item, index) => {
        return (
          <li key={item?._id}>
            <p>{item?.name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ClientComponent;
