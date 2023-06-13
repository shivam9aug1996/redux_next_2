import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSlice } from "@reduxjs/toolkit";

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
      }
    },
    logout: (state, action) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
        let token = action.payload?.token || "";
        localStorage.setItem("token", token);
        state.token = token;
        state.userData = action?.payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        let token = action.payload?.token || "";
        localStorage.setItem("token", token);
        state.token = token;
        state.userData = action?.payload;
      }
    );
  },
});

export const { useSignupMutation, useLoginMutation } = authApi;
export const { setAppStart, logout } = authSlice.actions;

export default authSlice.reducer;
