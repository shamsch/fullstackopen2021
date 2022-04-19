import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    addBlog(state,action) {
      return  [...state, action.payload]
    },
    addManyBlog(state,action){
        return [...action.payload];
    }
  },
});

export const { addBlog , addManyBlog } =
  blogSlice.actions;

export default blogSlice.reducer;