import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/auth";
import registerReducer from "./features/register/register";


export default configureStore({
  reducer: {
    users: registerReducer,
    auth: loginReducer,
  },
  customizedMiddleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
