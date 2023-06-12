import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const getUserApi = createApi({
//   reducerPath: "getUserApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   endpoints: (builder) => ({
//     getUsers: builder.query({
//       query: () => `users`,
//     }),
//   }),
// });

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  //refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: () => "/users",
    }),
    addUserInList: builder.mutation({
      query: (inputName) => ({
        method: "POST",
        url: "/users",
        body: JSON.stringify({ name: inputName }),
      }),
    }),
  }),
});

export const getUsers = createAsyncThunk("users/get", async () => {
  try {
    let data = await fetch("/api/users");
    data = await data?.json();
    console.log(data);
    return data;
  } catch (err) {
    return "error";
  }
});

export const addUser = createAsyncThunk("users/add", async (inputName) => {
  try {
    let data = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: inputName }),
    });
    data = await data?.json();
    console.log(data);
    return data;
  } catch (err) {
    return "error";
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    fetchLoading: 0,
    addLoading: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.fetchLoading = 1;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      console.log(action?.payload);
      state.userList = action?.payload;
      state.fetchLoading = 2;
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.addLoading = 1;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      console.log(action?.payload);
      state.userList = action?.payload;
      state.addLoading = 2;
    });
  },
});

export const { useGetUsersMutation, useAddUserInListMutation } = userApi;

export default userSlice.reducer;
