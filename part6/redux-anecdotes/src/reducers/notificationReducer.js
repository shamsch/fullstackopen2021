import { createSlice } from "@reduxjs/toolkit";

const initialState = "notification default message";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      const message = action.payload;
      state =  message;
      return state;
    },
    clearNotification(state) {
      state = "";
      return state;
    },
  },
});

export const { clearNotification, createNotification } = notificationSlice.actions;

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(createNotification(message))
    await setTimeout(()=>{
      dispatch(clearNotification())
    }, time*1000)
  }
}
export default notificationSlice.reducer;
