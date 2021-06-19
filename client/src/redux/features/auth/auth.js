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

// get current user account
export const getcurrentuser = createAsyncThunk('getcurrentuser', async() => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const setAuthToken = (token) => {
      if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
      } else {
        delete axios.defaults.headers.common["x-auth-token"];
      }
    };

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.get('/api/auth/currentuser', config)
    return res.data
  } catch (err) {
    console.error(err);
    console.log("Could not fetch the current user details!");
  }
})




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
      // state.user = action.payload.data.user;

      
    },

    [getcurrentuser.fulfilled] :(state, action) => {
      state.user = action.payload
    }
  },
});
export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
