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

export const createPost = createAsyncThunk(
  "/api/posts",
  async (data) => {
    
   
   
    const config = {
      headers: {
        "Content-Type": "application/json"
        
      },
    };

   
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
   

   
    const { title, body, link  } = data;

    const dataa = JSON.stringify({title, body, link });
    console.log(dataa)

    try {
      
      const res = await axios.post("/api/posts", dataa, config);
      return res.data;
    } catch (err) {
      console.error(err);
      console.log("Failed");
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    url: "",
    loading: true,
    message: "",
    post: {},
  },

  reducers: {},
  extraReducers: {
    [uploadPic.fulfilled]: (state) => {
      state.message = "pic uploaded";
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.url = action.payload.image;
      state.message = "post created";
      state.post = {
        name: action.payload.name,
        title: action.payload.title,
        body: action.payload.body,
        image: action.payload.image,
      };
      console.log(state.post);
    },
  },
});

export default postSlice.reducer;
