import { getProducts } from "@/app/serverActions";
import { Suspense } from "react";
import ClientList from "./ClientList";



// const getProducts = async () => {
//   let url = "";
//   if (process.env.NODE_ENV == "development") {
//     url = `http://localhost:3000/api/products`;
//   } else {
//     url = `${process.env.API_URL}api/products`;
//   }
//   let data = await fetch(url);
//   data = await data?.json();
//   return data;
// };

const ServerProductList = async() => {
  let data = await getProducts();
console.log("hgfe567",data?.productList)
  return (
    <>

    
     <ClientList data={data}/>
    
    </>
  )
}

export default ServerProductList