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
    token: localStorage.getItem('token')?localStorage.getItem('token'):'',
    isAuthenticated: false,
    user: {},
    message: "",
  },
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {    
      
       localStorage.setItem('token', action.payload.data.token); 
       state.token = action.payload.data.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.values;
      
      //   state.message = action.payload.msg;
    },
  },
});

export default loginSlice.reducer;
