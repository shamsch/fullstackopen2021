import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { login: false, createNote: false },
  reducers: {
    changeLoginNotification(state) {
      return { ...state, login: !state.login };
    },
    changeCreateNoteNotification(state) {
      return { ...state, createNote: !state.createNote };
    },
  },
});

export const { changeLoginNotification, changeCreateNoteNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
