import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/auth";
import { commentSlice } from "./features/Comments/comments";
import { postSlice } from "./features/posts/posts";
import registerReducer from "./features/register/register";


export default configureStore({
  reducer: {
    users: registerReducer,
    auth: loginReducer,
    posts: postSlice.reducer,
    comments: commentSlice.reducer,
  },
  customizedMiddleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
