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
    register_success: (state, name, email, password) => {
      state.user = true;
      console.log(name);
    },
  },
});

export const { register_success } = authSlice.actions;
export default authSlice.reducer;
