import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadPic = createAsyncThunk("/cloudinary", async (file) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "insta_clone");

  const url = `https://api.cloudinary.com/v1_1/duuo1ctgy/image/upload`;
  try {
    const res = await axios.post(url, formData);
    return res.data;
  } catch (err) {
    console.log(err);
    console.log("Failed to upload");
  }
});

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    url: "",
    loading: true,
    message: "",
  },

  reducers: {},
  extraReducers: {
    [uploadPic.fulfilled]: (state, action) => {
      state.loading = false;
      state.url = action.payload.url;
      state.message = "pic uploaded";
    },
    [uploadPic.rejected]: (error) => {
      console.log(error);
    },
  },
});

export default postSlice.reducer;
