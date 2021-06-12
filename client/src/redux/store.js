import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth";


export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
