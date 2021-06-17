import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// create a comment
export const createComment = createAsyncThunk(
  "/createcomment",
  async ({ id, comment }) => {
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

  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(comment);

    try {
      const res = await axios.post(
        `/api/posts/comment/${id.postid}`,
        body,
        config
      );
      console.log("Success: Comment added");
      return res.data;
    } catch (err) {
      console.error(err);
      console.log("Comment creation failed");
    }
  }
);

//  get all comments
export const getComments = createAsyncThunk('/getcomments', async (id) =>{
  try {
    const res = await axios.get(`/api/posts/comment/${id}`);
    return res.data;
    
  } catch (err) {
    console.error(err)
    console.log('Get comments failed!')
  }
})

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: true,
  },

  reducers: {},
  extraReducers: {
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
  },
});

export default commentSlice.reducer;
