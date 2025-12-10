import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "./statusSlice";

const store = configureStore({
  reducer: {
    status: statusReducer,
  },
});

export default store;
