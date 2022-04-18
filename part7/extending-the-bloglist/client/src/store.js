import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducer/blogReducer";
import notificationReducer from "./reducer/notificationReducer";
import userReducer from "./reducer/userReducer";


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer, 
  },
});

export default store;
