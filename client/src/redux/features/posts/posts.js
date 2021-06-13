import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// upload picture to cloudinary action
export const uploadPic = createAsyncThunk("/cloudinary", async (file) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "insta_clone");
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


// Create post action
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

// Get all posts
export const getAllPosts = createAsyncThunk("getposts", async () =>{

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

try {
  const res = await axios.get('/api/posts' )
  return res.data;
} catch (err) {
  console.error(err);
      console.log("Failed to get posts!");
}
})


export const postSlice = createSlice({
  name: "posts",
  initialState: {
    url: "",
    loading: true,
    message: "",
    post: {},
    posts: [],
  },

  reducers: {},
  extraReducers: {
    [uploadPic.fulfilled]: (state) => {
      state.message = "pic uploaded";
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Post created";
      state.post = {
        name: action.payload.name,
        title: action.payload.title,
        body: action.payload.body,
        image: action.payload.image,
      };
      console.log(state.post);
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.message = "posts fetched";
      state.posts = action.payload;
    },
  },
});

export default postSlice.reducer;
