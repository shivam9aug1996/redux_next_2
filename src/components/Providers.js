"use client";
import { setAppStart } from "@/redux/features/Auth/authSlice";
import store from "@/redux/store";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import RouteMiddleware from "../app/RouteMiddleware";

const Providers = ({ children }) => {
  store.dispatch(setAppStart());
  return (
    <Provider store={store}>
      <RouteMiddleware>{children}</RouteMiddleware>
    </Provider>
  );
};

export default Providers;
