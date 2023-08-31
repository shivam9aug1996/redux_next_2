import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/orders",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  tagTypes: ["order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `?userId=${data?.param}`,
        method: "POST",
        body: data?.body,
      }),
      invalidatesTags: ['order'],
    }),
    getOrderList: builder.query({
      query: (data) => ({
        url: `?userId=${data?.param}`,
        method: "GET",
      }),
      providesTags:['order'],
     // keepUnusedDataFor:600,
    }),
    
  }),
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.orderList = action?.payload
      //localStorage.setItem("cartValue",JSON.stringify(state.cartValue))
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      orderApi.endpoints.getOrderList.matchFulfilled,
      (state, action) => {
        state.orderList=action.payload?.orders||[]
      }
    );
  },
});

export const { setOrder } = orderSlice.actions;
export const {useGetOrderListQuery,useCreateOrderMutation} = orderApi

export default orderSlice.reducer;
