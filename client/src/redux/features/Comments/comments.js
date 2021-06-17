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
  try {
    const res = await axios.get(`/api/posts/comment/${id}`);
    return res.data;
    
  } catch (err) {
    console.error(err)
    console.log('Get comments failed!')
  }
})

// delete a comment
export const deleteComment = createAsyncThunk('/deletecomment', async(data) => {
  try {
    const comment_id = data.comment_id.id;
    const id = data.id.p_id;
    console.log(comment_id, id);
    const res = await axios.delete(
      `/api/posts/post/${id}/comment/${comment_id}`
    );
    return res.data;
  } catch (err) {
    console.error(err)
    console.log('Deleting the comment failed!')
  }
})

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    message: "",
  },

  reducers: {},
  extraReducers: {
    [createComment.pending]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
      state.message = "Comment added";
    },
    [getComments.pending]: (state) => {
      state.loading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [deleteComment.pending]: (state) => {
      state.loading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Comment Deleted!";
    },
  },
});

export default commentSlice.reducer;
