import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: null,
    loading: true,
    user: null,
  },

  reducers: {
    register_success: (state, values) => {
      state.user = true;
      console.log(values);
    },
  },
});

export const { register_success } = authSlice.actions;
export default authSlice.reducer;
