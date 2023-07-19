"use client";
import { setAppStart } from "@/redux/features/Auth/authSlice";
import store from "@/redux/store";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import RouteMiddleware from "../app/RouteMiddleware";
import Footer from "./Footer";
// import Header from "./Header";
import dynamic from 'next/dynamic'
const Header = dynamic(() => import('./Header'))

const Providers = ({ children }) => {
  useEffect(() => {
    store.dispatch(setAppStart());
  }, []);
  return (
    <Provider store={store}>
      <Header />
      <main className="container mx-auto py-4 min-h-screen  flex">
        {children}
      </main>
      <Footer />
      {/* <RouteMiddleware token={token} userData={userData}>
       
        {children}
        
        
        
        </RouteMiddleware> */}
    </Provider>
  );
};

export default Providers;
