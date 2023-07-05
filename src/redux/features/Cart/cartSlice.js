import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/cart",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
 // tagTypes: ['cart'],
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/add?userId=${data?.param}`,
        method: "POST",
        body: data?.body,
      }),
     // invalidatesTags: ['cart'],
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: `/remove?userId=${data?.param}`,
        method: "POST",
        body: data?.body,
      }),
     // invalidatesTags: ['cart'],
    }),
    getCart: builder.query({
      query: (data) => ({
        url: `/get?userId=${data?.param}`,
        method: "GET",
      }),
     // providesTags: ['cart'],
    }),
  }),
});

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
    cartValue:0
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      state.cartValue = action?.payload?.length
      //localStorage.setItem("cartValue",JSON.stringify(state.cartValue))
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.addToCart.matchFulfilled,
      (state, action) => {
        console.log(state.cart)
        let flag=0
        let g = state.cart?.map((item) => {
          if (item?.product?._id == action?.payload?.product?._id) {
            flag=1
            return {...item,...action?.payload,quantity:item.quantity+1};
          } else {
            return item;
          }
        });
        if(flag==0){
          state.cart.push({...action?.payload,quantity:1})
        }else{
          state.cart=g
        }
        state.cartValue=state?.cart?.length
       // localStorage.setItem("cartValue",JSON.stringify(state.cartValue))
       // localStorage.setItem("cart",JSON.stringify(state.cart))
        console.log(state.cart)
        // console.log(action.payload, state.cart);
        // let g = state.cart?.find((item) => {
        //   console.log(item,action.payload)
        //   return item?.product?._id == action?.payload?.product?._id;
        // });
        // console.log(g);
        // if (g) {
        //   let g = state.cart?.map((item) => {
        //     if (item?.product?._id == action?.payload?.product?._id) {
        //       return action?.payload;
        //     } else {
        //       return item;
        //     }
        //   });
        //   state.cart = g;
        // } else {
        //   state.cart.push(action.payload);
        // }
        // console.log(action.payload);
       
      }
    );
    builder.addMatcher(
      cartApi.endpoints.removeFromCart.matchFulfilled,
      (state, action) => {
        console.log(state.cart)
        let flag=0
        let g = state.cart?.map((item) => {
          if (item?.product?._id == action?.payload?.product?._id) {
            flag=1
            if(item.quantity>1){
              return {...item,...action?.payload,quantity:item.quantity-1};
            }else{
              return {quantity:-1}
            }
            
          } else {
            return item;
          }
        })
       g= g.filter((item)=>{
          return item?.quantity!=-1
        })
        if(flag==0){
          state.cart.push({...action?.payload,quantity:1})
        }else{
          state.cart=g
        }
        state.cartValue=state?.cart?.length
       // localStorage.setItem("cartValue",JSON.stringify(state.cartValue))
       // localStorage.setItem("cart",JSON.stringify(state.cart))
        console.log(state.cart)
        // console.log(action.payload, state.cart);
        // let g = state.cart?.find((item) => {
        //   console.log(item,action.payload)
        //   return item?.product?._id == action?.payload?.product?._id;
        // });
        // console.log(g);
        // if (g) {
        //   let g = state.cart?.map((item) => {
        //     if (item?.product?._id == action?.payload?.product?._id) {
        //       return action?.payload;
        //     } else {
        //       return item;
        //     }
        //   });
        //   state.cart = g;
        // } else {
        //   state.cart.push(action.payload);
        // }
        // console.log(action.payload);
       
      }
    );
    builder.addMatcher(
      cartApi.endpoints.getCart.matchFulfilled,
      (state, action) => {
       
        console.log(action.payload);
        state.cart = action.payload?.cart;
        
        state.cartValue=action?.payload?.cart?.length
       // localStorage.setItem("cartValue",JSON.stringify(state.cartValue))
        //localStorage.setItem("cart",JSON.stringify(state.cart))
      }
    );
    // builder.addMatcher(
    //   cartApi.endpoints.getCart.matchPending,
    //   (state, action) => {
       
       
        
        
    //    if( localStorage.getItem("cartValue")){
    //     state.cartValue= localStorage.getItem("cartValue")
    //    }
    //    if( localStorage.getItem("cart")){
    //     state.cart= JSON.parse(localStorage.getItem("cart"))
    //    }
    //   }
    // );
  },
});

export const { setCart,startAppSetCartValue } = cartSlice.actions;

export const { useAddToCartMutation, useGetCartQuery,useRemoveFromCartMutation } = cartApi;

export default cartSlice.reducer;
