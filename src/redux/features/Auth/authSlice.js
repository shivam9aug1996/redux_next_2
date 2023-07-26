import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setCart } from "../Cart/cartSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
    googleAuth: builder.mutation({
      query: (data) => ({
        url: "/google-login",
        method: "POST",
        body: data,
      }),
    }),
    verifyRecaptcha: builder.mutation({
      query: (data) => ({
        url: "/verify-recaptcha",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: "",
    userData: null,
  },
  reducers: {
    setAppStart: (state, action) => {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
      } else if (!localStorage.getItem("token")) {
        state.token = undefined;
      }

      if (localStorage.getItem("userData")) {
        state.userData = JSON.parse(localStorage.getItem("userData"));
      } else if (!localStorage.getItem("userData")) {
        state.userData = undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
        let token = action.payload?.token || "";
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(action?.payload));
        state.token = token;
        state.userData = action?.payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        let token = action.payload?.token || "";
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(action?.payload));
        state.token = token;
        state.userData = action?.payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, action) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        state.token = undefined;
        state.userData = undefined;
      }
    );
    builder.addMatcher(
      authApi.endpoints.googleAuth.matchFulfilled,
      (state, action) => {
        let token = action.payload?.token || "";
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(action?.payload));
        state.token = token;
        state.userData = action?.payload;
      }
    );
  },
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation,useGoogleAuthMutation,useVerifyRecaptchaMutation } =
  authApi;
export const { setAppStart, logout } = authSlice.actions;

export default authSlice.reducer;
