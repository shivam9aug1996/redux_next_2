import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setCart } from "../Cart/cartSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
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
        method: "POST",
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
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
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
        console.log("jytfghji876");
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
    builder.addMatcher(
      authApi.endpoints.updateProfile.matchFulfilled,
      (state, action) => {
        let data;
        if (action.meta.arg.originalArgs) {
          console.log("mjhgre67890uyg", action.meta.arg.originalArgs);
          data = JSON.parse(action.meta.arg.originalArgs);
        }
        const { name, modifiedAddresses, newAddress, addressToDeleteId } = data;
        console.log("jhyt56789", JSON.parse(action.meta.arg.originalArgs));
        console.log("765efghjytrdfgh", newAddress, name, action.payload);
        const { addressId } = action?.payload;
        if (name) {
          localStorage.setItem(
            "userData",
            JSON.stringify({ ...state.userData, name })
          );
          state.userData = { ...state.userData, name };
        }
        if (newAddress) {
          console.log("jhgre4567890", newAddress);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              ...state.userData,
              addresses: [
                { ...newAddress, addressId },
                ...state?.userData?.addresses,
              ],
            })
          );
          state.userData = {
            ...state.userData,
            addresses: [
              { ...newAddress, addressId },
              ...state?.userData?.addresses,
            ],
          };
        }
        if (addressToDeleteId) {
          let modifiedData = state?.userData?.addresses?.filter((item) => {
            return item?.addressId !== addressToDeleteId;
          });
          localStorage.setItem(
            "userData",
            JSON.stringify({ ...state.userData, addresses:modifiedData })
          );
          state.userData = { ...state.userData, addresses:modifiedData };
        }
        if(modifiedAddresses){
         let modifiedData=state?.userData?.addresses?.map((item) => {
             if(item?.addressId == modifiedAddresses?.addressId){
             
              return modifiedAddresses
             }else return item
          });
          localStorage.setItem(
            "userData",
            JSON.stringify({ ...state.userData, addresses:modifiedData })
          );
          state.userData = { ...state.userData, addresses:modifiedData };
        }
      }
    );
  },
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGoogleAuthMutation,
  useVerifyRecaptchaMutation,
  useUpdateProfileMutation,
} = authApi;
export const { setAppStart, logout } = authSlice.actions;

export default authSlice.reducer;
