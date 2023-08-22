import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { createSlice } = require("@reduxjs/toolkit");

// Merge function
const mergeProducts = (existingData, newData) => {
  if (!newData) {
    // No new data to merge, return existing data
    return existingData;
  }

  if (!existingData) {
    // No existing data, use the new data
    return newData.productList || [];
  }

  // Merge the new productList into the existing data
  const mergedData = {
    ...existingData,
    productList: [...existingData.productList, ...newData.productList],
    pagination:newData?.pagination
  };

  return mergedData;
};


export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  refetchOnReconnect: true,
 tagTypes:["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (data) => {
        console.log("Params:", data); 
       return {
        url: `/products`,
        method: "GET",
        params:{
          page:data[1]?.page
        }
       }
      },
      async onCacheEntryAdded(arg, { dispatch, cacheEntryRemoved }) {
        cacheEntryRemoved.then(() => {
          dispatch(updatePageNumber(1));
        });
      
        // `onStart` side-effect
      //  dispatch(messageCreated('Fetching post...',getCacheEntry()))
       
      },

        // Only have one cache entry because the arg always maps to one string
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
        // Always merge incoming data to the cache entry
        merge: mergeProducts,
        // Refetch when the page arg changes
        forceRefetch({ currentArg, previousArg }) {
          console.log("jy5456oiuygfdfghjk",currentArg,previousArg)
          return currentArg?.[1]?.page !== previousArg?.[1]?.page
        },
       
       // keepUnusedDataFor:10,
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg
      // },
      // forceRefetch({ currentArg, previousArg,state,endpointState }) {
      //   console.log(currentArg,previousArg)
      //   return currentArg !== previousArg
      // },
      providesTags: ['products'],
    
      //keepUnusedDataFor:600
    }),
  }),
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    productList: [],
    pageNumber:1
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    updateProducts: (state, action) => {
      state.productList = [...state?.productList,...action?.payload];
    },
    updatePageNumber:(state, action) => {
      if(action?.payload){
        state.pageNumber = 1
      }else{
        state.pageNumber = parseInt(state.pageNumber)+1
      }
      
    },
  },
});

export const { setProductList,updatePageNumber } = productSlice.actions;


export const { useGetProductsQuery } = productApi;

export default productSlice.reducer;
