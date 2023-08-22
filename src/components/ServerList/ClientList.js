"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import InfiniteScroll from "../Products/InfiniteScroll";
import { useState } from "react";
import { getProducts } from "@/app/serverActions";
import { useEffect } from "react";
import LoaderFull from "../LoaderFull";
const Button = dynamic(() => import("@/app/product/[productId]/Button"));

const ClientList = ({ data }) => {
  const [page,setPage] = useState(1)
  const [productData,setProductData] = useState(data)
  const loadingRef=useRef(false)
  const paginationDataRef = useRef(data?.pagination);

  useEffect(()=>{
    const hit=async()=>{
      let f=await getProducts(page)
      setProductData({...f,productList:[...productData?.productList,...f?.productList]})
      paginationDataRef.current=f?.pagination
     loadingRef.current=false
    }
    if(page>1){
      console.log(productData)
      hit()
    }
  },[page])
  console.log("hgre3456789",productData)

  const hitBottom=()=>{
    if(loadingRef?.current==false&& paginationDataRef.current?.currentPage <
      paginationDataRef.current?.totalPages){
      console.log("8765rfvbnkuyfdcvbnmk",productData)
      setPage(prev=>prev+1)
      loadingRef.current=true
     }
  }
  return (
    <div>
      <div className="flex flex-wrap justify-center md:justify-start">
        {productData?.productList?.map((item, index) => {
          // let isNewItem
          // // console.log("jhtr4456789iuygfghj",productData?.length , data?.productList?.length)
          // data?.productList?.map((it)=>{
          //   console.log(it,item)
          //   isNewItem=item?._id===it?._id?true:false
          // })

          return (
            <div
              key={item?._id}
              className={`w-full sm:w-1/2 md:w-1/2 lg:w-1/4 p-4`}
              // onMouseOver={()=>{
              //   router.prefetch(`/product/${item?._id}`)
              // }}
            >
              <div className="border border-gray-300 rounded p-4">
                <Link href={`/product/${item?._id}`}>
                  <div
                    className={`image-container cursor-pointer }`}
                    // onClick={() => {
                    //   router.push(`/product/${item?._id}`);
                    // }}
                  >
                    <Image
                      //onLoad={(e) => e.target.classList.add("loaded")}
                      src={item?.image}
                      alt={item?.name}
                      width={640}
                      height={912}
                      className={`w-full mb-2 zoom-effect ${
                        item?.isNew && !isFetching ? "fade-in" : ""
                      }`}
                      priority
                    />
                  </div>
                </Link>

                <Link href={`/product/${item?._id}`}>
                  <h3
                    // onClick={() => {
                    //   router.push(`/product/${item?._id}`);
                    // }}
                    className="text-lg font-semibold mb-2 cursor-pointer"
                  >
                    {item?.name}
                  </h3>
                </Link>

                <p className="text-gray-600">&#8377;{item?.price.toFixed(2)}</p>

                <Button productId={item?._id} />
              </div>
            </div>
          );
        })}
        <InfiniteScroll
          onReachBottom={() => {
           
            hitBottom()
           // console.log("hifdfghj");
          
         
            //console.log("mjhgre456ygfvbnm,",f)
          }}
          threshold={200}
        />
        {loadingRef?.current==true&&<LoaderFull/>}
      </div>
    </div>
  );
};

export default ClientList;
