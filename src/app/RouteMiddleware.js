"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import Header from "@/components/Header";
import { usePathname, redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const RouteMiddleware = ({ children}) => {
  const token = useSelector((state) => state?.auth?.token);
  const currentUrl = usePathname();

  console.log(currentUrl);
 

  useEffect(()=>{
if(token||token==undefined){
  if ((currentUrl == "/login" || currentUrl == "/signup") && token) {
    redirect("/");
  }
  if ((currentUrl == "/order" || currentUrl == "/cart") && token==undefined) {
    redirect("/");
  }
}
  },[token,currentUrl])
 
  return (
    <>
      <Header/>
      <main className="container mx-auto py-4 min-h-screen  flex">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default RouteMiddleware;
