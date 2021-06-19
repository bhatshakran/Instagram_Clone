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



// get users profile
export const getuserdetails = createAsyncThunk('getuserdetails', async(id) =>{
  try {
    const setAuthToken = token =>{
      if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
      } else {
        delete axios.defaults.headers.common["x-auth-token"];
      }
    }

    if(localStorage.token) {
      setAuthToken(localStorage.token)
  }

    const res = await axios.get(`/api/auth/user/${id}`);
    return res.data
    
    
  } catch (err) {
    console.error(err.message)
    console.log('Cannot fetch the user!')
  }
})


// register slice
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
    [getuserdetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getuserdetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "User fetched!";
      state.user = action.payload;
    },
  },
});

export default registerSlice.reducer;
