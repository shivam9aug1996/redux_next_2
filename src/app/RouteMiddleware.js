"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname, redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const RouteMiddleware = ({ children }) => {
  const token = useSelector((state) => state?.auth?.token);
  const currentUrl = usePathname();

  console.log(currentUrl);
  if ((currentUrl == "/login" || currentUrl == "/signup") && token) {
    return redirect("/");
  }
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default RouteMiddleware;
