import { createSlice } from "@reduxjs/toolkit";

const initialState = "notification default message";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    voteMessage(state, action) {
      const anecdote = action.payload;
      state = "you voted '" + anecdote + "'";
      return state;
    },
    createMessage(state, action) {
      const anecdote = action.payload;
      state = "you created the anecdote'" + anecdote + "'";
      return state;
    },
    clearNotification(state) {
      state = "";
      return state;
    },
  },
});

export const { clearNotification, voteMessage, createMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
