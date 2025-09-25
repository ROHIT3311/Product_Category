// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/authSlice";
import partReducer from "../services/partSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    part: partReducer,
  },
});
