import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createComment = createAsyncThunk(
  "/createcomment",
  async ({ id, comment }) => {
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
  },
});

export default commentSlice.reducer;
