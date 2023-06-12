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
  },
  reducers: {
    setAppStart: (state, action) => {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        let token = action.payload?.token || "";
        localStorage.setItem("token", token);
        state.token = token;
      }
    );
  },
});

export const { useSignupMutation, useLoginMutation } = authApi;
export const { setAppStart } = authSlice.actions;

export default authSlice.reducer;
