import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateProfile = createAsyncThunk(
  "/updateprofile",
  async (data) => {
    try {
      console.log("hello");
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
      console.log(state);
    },
  },
});

export default profileSlice.reducer;
