"use client";
import { setAppStart } from "@/redux/features/Auth/authSlice";
import store from "@/redux/store";
import React, { useEffect, useLayoutEffect } from "react";
import { Provider } from "react-redux";
import RouteMiddleware from "../app/RouteMiddleware";
// import Footer from "./Footer";
import Header from "./Header";
import dynamic from "next/dynamic";
import { setAppStartCart } from "@/redux/features/Cart/cartSlice";
import SplashScreen from "./SplashScreen";

 const Footer = dynamic(() => import('./Footer'))
//  const SplashScreen = dynamic(() => import('./SplashScreen'))

const Providers = ({ children }) => {
  useLayoutEffect(() => {
    store.dispatch(setAppStart());
    store.dispatch(setAppStartCart());
  }, []);

  useEffect(() => {
    // Load the Google reCAPTCHA script dynamically when the component mounts
    setTimeout(() => {
      const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <main className="container mx-auto py-4 min-h-screen  flex">
      <SplashScreen />
        {children}
      </main>
      <Footer />
    </Provider>
  );
};

export default Providers;
