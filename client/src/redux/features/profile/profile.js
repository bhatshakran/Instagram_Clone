import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// upload picture to cloudinary action
export const uploadProfilePic = createAsyncThunk("/cloudinary/pp", async (file) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "insta_clone");
  formData.append("folder", "profilepics");
  delete axios.defaults.headers.common["x-auth-token"];
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `https://api.cloudinary.com/v1_1/duuo1ctgy/image/upload`;
  try {
    const res = await axios.post(url, formData, config);
    return res.data;
  } catch (err) {
    console.log(err);
    console.log("Failed to upload");
  }
});

// upload user profile

export const updateProfile = createAsyncThunk(
  "/updateprofile",
  async (data) => {
    try {
      const { _id, name, email, username, bio, gender, website, phone, profilepic } = data;

      const body = JSON.stringify({
        name,
        email,
        username,
        bio,
        website,
        gender,
        phone,
        profilepic
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

      return res.data;
    } catch (err) {
      console.error(err);
      console.log("Failed to update the profile");
    }
  }
);


// get my posts
export const getmyposts = createAsyncThunk("getmyposts", async () => {
  try {
    const res = await axios.get("/api/posts/myposts");
    return res.data;
  } catch (err) {
    console.error(err);
    console.log("Couldn't fetch your posts");
  }
});




export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    message: "",
    response: {},
    userposts:[]
  },
  reducers: {},
  extraReducers: {
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = 'Profile updatedd!';
      state.response = action.payload
    },
    [uploadProfilePic.fulfilled]: (state, action) => {
      state.loading = false
    },
  
    [getmyposts.fulfilled] : (state, action) => {

      state.loading = false;
      state.userposts = action.payload;
      state.message = 'Fetched your posts!'
    }
  }
});

export default profileSlice.reducer;
