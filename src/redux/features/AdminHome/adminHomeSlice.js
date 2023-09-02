import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminHomeApi = createApi({
  reducerPath: "adminHomeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
 // refetchOnMountOrArgChange:true,
 tagTypes: ["admin"],
  endpoints: (builder) => ({
   
    getAdminHome: builder.query({
      query: (data) => ({
        url: `/dashboard`,
        method: "GET",
      }),
     providesTags:['admin'],
     // keepUnusedDataFor:600,
    }),
    
  }),
});

const adminHomeSlice = createSlice({
  name: "adminHome",
  initialState: {
    productCount:0,
    categoryCount:0,
    usersCount:0,
    ordersCount:0
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    
  },
});


export const {useGetAdminHomeQuery} = adminHomeApi

export default adminHomeSlice.reducer;
