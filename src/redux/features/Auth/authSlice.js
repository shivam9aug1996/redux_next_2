import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


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
      if(Cookies.get('token')){
        state.token = Cookies.get('token')
      }
      if(Cookies.get('userData')){
        state.userData = JSON.parse(Cookies.get('userData'))
      }
      // if (localStorage.getItem("token")) {
      //   state.token = localStorage.getItem("token");
      // }
      // if (localStorage.getItem("userData")) {
      //   state.userData = JSON.parse(localStorage.getItem("userData"));
      // }
    },
    // logout: (state, action) => {
    //   state.token = "";
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("userData")
    //   document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //   document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // },
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
      localStorage.removeItem("userData")
        state.token = "";
        state.userData = null
      }
    );
  },
});

export const { useSignupMutation, useLoginMutation,useLogoutMutation } = authApi;
export const { setAppStart, logout } = authSlice.actions;

export default authSlice.reducer;
