import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const categoryApi = createApi({
  reducerPath:"categoryApi",
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
  tagTypes: ["category"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => {
        console.log("kuy654edfgh",data)
        return ({
          url: `/category`,
          method: "POST",
          body: data?.body,
        })
      },
      //invalidatesTags: ['category',"admin"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category`,
        method: "GET",
      }),
      providesTags:['category'],
     // keepUnusedDataFor:600,
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/category`,
        method: "PUT",
        body: data?.body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `/category?categoryId=${data?.categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
})

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    categories: []
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      categoryApi.endpoints.getCategories.matchFulfilled,
      (state, action) => {
        state.categories=action.payload?.categories||[]
      }
    );
    builder.addMatcher(
      categoryApi.endpoints.createCategory.matchFulfilled,
      (state, action) => {
        console.log(action.payload)
        state.categories.unshift({...action?.payload?.data})
      }
    );
    builder.addMatcher(
      categoryApi.endpoints.updateCategory.matchFulfilled,
      (state, action) => {
        console.log(action.payload.data)
        let modifiedData = state.categories.map((item)=>{
          if(item?._id==action?.payload?.data?._id){
            return {...action.payload.data}
          }else{
            return item
          }
        })
        state.categories=modifiedData
      }
    );
    builder.addMatcher(
      categoryApi.endpoints.deleteCategory.matchFulfilled,
      (state, action) => {
        console.log(action.payload.data)
        let modifiedData = state.categories.filter((item)=>{
         return item?._id!==action?.payload?.data?._id
        })
        state.categories=modifiedData
      }
    );
  },
});

export const {
  useGetCategoriesQuery,useCreateCategoryMutation,useDeleteCategoryMutation,useUpdateCategoryMutation
} = categoryApi;

export default categorySlice.reducer;