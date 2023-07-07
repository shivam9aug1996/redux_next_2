"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import Header from "@/components/Header";
import { usePathname, redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const RouteMiddleware = ({ children,token,userData }) => {
 // const token = useSelector((state) => state?.auth?.token);
  const currentUrl = usePathname();

  console.log(currentUrl);
  if ((currentUrl == "/login" || currentUrl == "/signup") && token) {
    redirect("/");
  }
  if ((currentUrl == "/order" || currentUrl == "/cart") && !token) {
    redirect("/");
  }
 
  return (
    <>
      <Header token={token} userData={userData}/>
      <main className="container mx-auto py-4 min-h-screen  flex">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default RouteMiddleware;
