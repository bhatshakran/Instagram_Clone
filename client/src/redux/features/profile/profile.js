import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
  "/updateprofile",
  async (data) => {
    try {
      const { _id, name, email, username, bio, gender, website, phone } = data;

      const body = JSON.stringify({
        name,
        email,
        username,
        bio,
        website,
        gender,
        phone,
      });

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

      const res = await axios.patch(
        `/api/auth/editprofile/${_id}`,
        body,
        config
      );
      return res;
    } catch (err) {
      console.error(err);
      console.log("Failed to update the profile");
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    message: "",
    response: {},
  },
  reducers: {},
  extraReducers: {
    [updateProfile.fulfilled]: (state, action) => {
      // console.log(state);
    },
  },
});

export default profileSlice.reducer;
