import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("/api/users", async (values) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { name, email, password } = values;

  const body = JSON.stringify({ name, email, password });
  const res = await axios.post("/api/users", body, config);
  const response = { msg: res.data.message, values };
  return response;
});

export const registerSlice = createSlice({
  name: "users",
  initialState: {
    isAuthenticated: false,
    loading: true,
    user: {},
    message: "",
  },
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.values;
      state.message = action.payload.msg;
    },
  },
});

export default registerSlice.reducer;
