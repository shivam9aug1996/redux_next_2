import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { createSlice } = require("@reduxjs/toolkit");

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  refetchOnReconnect: true,
  tagTypes:["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ['products'],
      keepUnusedDataFor:600
    }),
  }),
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    productList: [],
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
  },
});

export const { setProductList } = productSlice.actions;


export const { useGetProductsQuery } = productApi;

export default productSlice.reducer;
