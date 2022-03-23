import { createSlice } from "@reduxjs/toolkit";

const initialState = "notification default message";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
});

export const { getNotification } = notificationSlice.actions;
export default notificationSlice.reducer;