import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/auth";
import { commentSlice } from "./features/comments/comments";
import { postSlice } from "./features/posts/posts";
import { profileSlice } from "./features/profile/profile";
import registerReducer from "./features/register/register";



export default configureStore({
  reducer: {
    users: registerReducer,
    auth: loginReducer,
    posts: postSlice.reducer,
    comments: commentSlice.reducer,
    profile: profileSlice.reducer,
  },
  customizedMiddleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
