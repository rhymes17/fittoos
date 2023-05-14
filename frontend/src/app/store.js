import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import entryReducer from "../features/entries/entrySlice";
import catReducer from "../features/category/catSLice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    entry: entryReducer,
    category: catReducer,
  },
});
