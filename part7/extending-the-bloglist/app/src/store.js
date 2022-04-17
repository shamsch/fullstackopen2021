import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducer/blogReducer";
import notificationReducer from "./reducer/notificationReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
  },
});

export default store;
