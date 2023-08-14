"use client";
// import Button from "@/app/product/[productId]/Button";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "@/redux/features/Cart/cartSlice";
import {
  productApi,
  setProductList,
  updatePageNumber,
  useGetProductsQuery,
} from "@/redux/features/Product/productSlice";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRef } from "react";
import Loader from "../Loader";
import InfiniteScroll from "./InfiniteScroll";

const LoaderFull = dynamic(() => import("../LoaderFull"));
const Toast = dynamic(() => import("../Toast"));
const Button = dynamic(() => import("@/app/product/[productId]/Button"));
// import LoaderFull from "../LoaderFull";
// import Toast from "../Toast";

const ProductClient = ({}) => {
  const pageNumber = useSelector((state) => state?.products?.pageNumber);
 
  //const [pageNumber, setPgeNumber] = useState(1);
  const [productData, setProductData] = useState([]);
  // const [paginationData,setPaginationData] = useState(null)
  const {
    isSuccess,
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isUninitialized,
  } = useGetProductsQuery([
    "getProducts",
    { page: pageNumber},
  ]);
  const router = useRouter();
  const isFetchingRef = useRef(null);
  const paginationDataRef = useRef(null);
  const lastProductRef = useRef(null); // Reference to the last product element

  console.log(",kjhgre89rdfghjk", data);
  // useEffect(() => {
  //  // getProducts();
  // }, []);

 // const userId = useSelector((state) => state?.auth?.userData?.id);

  // const userId = state?.auth?.userData?.id;
  // console.log(userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFetching && data) {
      //   let newModData=data?.productList?.map((item,index)=>{
      //     return {...item,isNew:true}
      //   })
      //   let oldModData= cartData876?.products.productList?.map((item,index)=>{
      //     return {...item,isNew:false}
      //   })
      //  // setProductData([...oldModData,...newModData])
      //   dispatch(setProductList([...oldModData,...newModData]))
      //updateProducts()
      //setPaginationData(data?.pagination)
      paginationDataRef.current = data?.pagination;
    }
  }, [isFetching, data]);

  useEffect(() => {
    if (isFetching) {
      isFetchingRef.current = true;
    } else {
      isFetchingRef.current = false;
    }
  }, [isFetching]);

  // useEffect(()=>{
  //   if(productData){
  //   setTimeout(() => {
  //     let oldModData=productData?.map((item,index)=>{
  //       return {...item,isNew:false}
  //     })
  //     setProductData(oldModData)
  //   }, 500);
  // }

  // },[productData])

  // useEffect(() => {
  //   // Scroll to the last product element when new data is fetched
  //   if (isFetchingRef.current && lastProductRef.current) {
  //     setTimeout(() => {
  //       lastProductRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "end",
  //         inline: "nearest",
  //       });
  //     }, 1000);
  //   }
  // }, [isFetching]);

  // const handleIntersection = (entries) => {
  //   const [entry] = entries;
  //   if (entry.isIntersecting && !isLoading && !isFetching && isSuccess) {
  //     // Load more data when the user scrolls to the end
  //     // setPgeNumber((prev) => prev + 1);
  //     if (entry.intersectionRatio >= 0.1) {
  //       // Trigger the API call only if the intersection ratio is at least 0.1 (close to the bottom)
  //       console.log(pageNumber+1)
  //      // setPgeNumber((prev) => prev + 1);
  //     }
  //   }
  // };
  // console.log(pageNumber)

  // useEffect(() => {
  //   // Observe the trigger element for intersection
  //   const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
  //   if (isSuccess && !isFetching && !isUninitialized) {
  //     observer.observe(document.getElementById("load-more-trigger"));
  //   }
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [isSuccess, isFetching, isUninitialized]);

  console.log("paginationData", paginationDataRef.current);

  const debounce = useCallback((func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }, []);

  // const handleScroll =()=>{
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     // Load more data when the user scrolls to the bottom

  //     debounce(()=>console.log("hi"),2000)
  //   }
  // }

  // const handleScroll=debounce((e)=>{
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     // Load more data when the user scrolls to the bottom

  //    console.log("hi",e)
  //       if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight&&e==false
  //   ) {
  //     // Load more data when the user scrolls to the bottom
  //   setPgeNumber((prev)=>prev+1)
  //     //debounce(()=>console.log("hi"),2000)
  //   }
  //   }
  // },500)

  // const handleScroll=(e,data)=>{

  //    console.log("hi",e,data)
  //       if (
  //     window.innerHeight + document.documentElement.scrollTop >=
  //     document.documentElement.offsetHeight-600&&e==false&&data?.currentPage<data?.totalPages
  //   ) {
  //     // Load more data when the user scrolls to the bottom
  //   //setPgeNumber((prev)=>prev+1)
  //   console.log("765redvbjki8765redfvbhji8765rdfhji765rd")
  //  // dispatch(updatePageNumber())
  //     //debounce(()=>console.log("hi"),2000)
  //   }

  // }

  // useEffect(() => {
  //   // Attach the scroll event listener
  //   window.addEventListener("scroll", ()=>handleScroll(isFetchingRef.current,paginationDataRef.current));

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("scroll", ()=>handleScroll(isFetchingRef.current,paginationDataRef.current));
  //   };
  // }, []);

  // useEffect(() => {
  //   const scrollHandler = () => {
  //     //handleScroll(isFetchingRef.current, paginationDataRef.current);
  //     console.log("ghu6543wscvgh")
  //   };
  
  //   // Attach the scroll event listener
  //   window.addEventListener("scroll", scrollHandler);
  
  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("scroll",()=>{});
  //   };
  // }, []);

  console.log(productData);

  const ProductItemSkeleton = () => {
    const arr = new Array(20).fill(0);
    return arr?.map((item, index) => {
      return (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="border border-gray-300 rounded p-4">
            <Skeleton height={0} style={{ paddingBottom: "140%" }} />
            <h3 className="text-lg font-semibold mb-2 mt-5">
              <Skeleton width={"60%"} height={20} />
            </h3>
            <p className="text-gray-600">
              <Skeleton width={"40%"} height={20} />
            </p>

            <Skeleton width={"60%"} height={40} style={{ marginTop: "1rem" }} />
          </div>
        </div>
      );
    });
  };

  // const [
  //   addToCart,
  //   {
  //     isSuccess: isSuccess1,
  //     data: data1,
  //     isLoading: isLoading1,
  //     isError: isError1,
  //     error: error1,
  //   },
  // ] = useAddToCartMutation();
  // const cartItemsQuery = useGetCartQuery({param:userId},{skip:true});
  // const [removeFromCart, { isSuccess:isSuccess2,  isLoading:isLoading2, isError:isError2 }] =
  // useRemoveFromCartMutation();
  // useEffect(() => {
  //   // dispatch(setProductList(data));
  //   if(isSuccess1){
  //     cartItemsQuery.refetch()
  //   }

  // }, [isSuccess1]);
  const customLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  console.log(
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    isUninitialized
  );

  return (
    <>
   
      {/* <button
    
        disabled={isFetching ? true : false}
        onClick={() => {
        // dispatch( productApi.util.resetApiState())

        //dispatch(refetch())
         setPgeNumber((prev) => prev + 1);
        //  await refetch();
        }}
      >
        INcr
      </button> */}
      <div className="flex flex-wrap justify-center md:justify-start">
        {isError && <Toast message={error?.error || error?.data?.error} />}

        {isLoading ? <ProductItemSkeleton /> : null}

        {isSuccess &&
          data.productList?.map((item, index) => {
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

                  <p className="text-gray-600">
                    &#8377;{item?.price.toFixed(2)}
                  </p>

                  <Button productId={item?._id} />
                </div>
              </div>
            );
          })}
      </div>
      <InfiniteScroll onReachBottom={()=>{
       if(paginationDataRef.current?.currentPage<paginationDataRef.current?.totalPages&&isFetchingRef.current==false){
        dispatch(updatePageNumber())
        console.log("hiuytredfghjk")
       }
      }} threshold={200} />
      {isFetching && data?.productList?.length > 0 ? <LoaderFull /> : null}
      
    </>
  );
};

export default ProductClient;
