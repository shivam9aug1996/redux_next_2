import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { createSlice } = require("@reduxjs/toolkit");

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    //     getPokemons: build.query({
    //       query: () => (`/getpokemons`),
    //       transformResponse: (response) => response.data,
    //       providesTags: ['Pokemons'],
    // }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      keepUnusedDataFor: 60,
    }),
  }),
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    productList: [],
  },
});

export const { useGetProductsQuery } = productApi;

export default productSlice.reducer;
