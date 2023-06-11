import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
  },
  reducers: {},
});

export default userSlice.reducer;
