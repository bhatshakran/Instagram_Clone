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

// Like/Unlike a post

export const likePost = createAsyncThunk('/likeOrUnlike/:id', async(data)=> {
if(data.type === 'like'){
  try {
console.log('type liked: from redux')
    const res = await axios.put(`/api/posts/like/${data.id}` );
    return res.data;
    
  } catch (err) {
    console.error(err);
    console.log("Failed to like the post!");
  }
}else if(data.type === 'unlike'){
  try {
console.log('type unliked: from redux')
    const res = await axios.put(`/api/posts/unlike/${data.id}` );
    return res.data;
    
  } catch (err) {
    console.error(err);
    console.log("Failed to unlike the post!");
  }
}
  


})

// Get all likes of a post
export const getLikesById = createAsyncThunk('getLikes', async (id) => {
  try {
    let res = await axios.get(`/api/posts/like/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to get likes of the post!");
  }

  
})





export const postSlice = createSlice({
  name: "posts",
  initialState: {
    url: "",
    loading: false,
    message: "",
    post: {},
    posts: [],
    alertMessage: "",
    likesOfPost: null,
  },

  reducers: {
    clearAlertMsg: (state) => {
      state.alertMessage = "";
    },
  },
  extraReducers: {
    [uploadPic.pending]: (state) => {
      state.loading = true;
    },
    [uploadPic.fulfilled]: (state) => {
      state.message = "pic uploaded";
    },
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Post created";
      state.alertMessage = "Post uploaded";
      state.post = {
        name: action.payload.name,
        title: action.payload.title,
        body: action.payload.body,
        image: action.payload.image,
      };
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.message = "posts fetched";
      state.posts = action.payload.posts;
      state.user = action.payload.user;
    },

    [likePost.fulfilled]: (state, action) => {
      state.loading = false;
      // state.message = "Post liked";
    },
    [getLikesById.fulfilled]: (state, action) => {
      state.loading = false;
      state.likesOfPost = Object.values(action.payload);
    },
  },
});
export const { clearAlertMsg } = postSlice.actions;

export default postSlice.reducer;
