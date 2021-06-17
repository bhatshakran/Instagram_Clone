import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("/api/auth", async (values) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { email, password } = values;
  const body = JSON.stringify({ email, password });

  const res = await axios.post("/api/auth", body, config);
  const response = { data: res.data, values };
  return response;
});




export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    isAuthenticated: false,
    user: localStorage.getItem("user") ? localStorage.getItem("user") : "",
    message: "",
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.token = "";
      state.loading = false;
      state.user = {};
    },
    // getUser:state => {

    // }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem('user', JSON.stringify(action.payload.data.user))
      state.token = action.payload.data.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.data.user;

      
    },
  },
});
export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
