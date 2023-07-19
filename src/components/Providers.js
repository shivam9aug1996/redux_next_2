"use client";
import { setAppStart } from "@/redux/features/Auth/authSlice";
import store from "@/redux/store";
import React, { useEffect, useLayoutEffect } from "react";
import { Provider } from "react-redux";
import RouteMiddleware from "../app/RouteMiddleware";
import Footer from "./Footer";
import Header from "./Header";
import dynamic from "next/dynamic";
import { setAppStartCart } from "@/redux/features/Cart/cartSlice";
// const Header = dynamic(() => import('./Header'))

const Providers = ({ children }) => {
  useLayoutEffect(() => {
    store.dispatch(setAppStart());
    store.dispatch(setAppStartCart());
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <main className="container mx-auto py-4 min-h-screen  flex">
        {children}
      </main>
      <Footer />
    </Provider>
  );
};

export default Providers;
