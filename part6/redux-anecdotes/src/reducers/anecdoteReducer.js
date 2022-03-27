import { createSlice } from "@reduxjs/toolkit";
import { getAll } from "../services/anecdote";

const getId = () => (100000 * Math.random()).toFixed(0);


const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    registerVote(state, action) {
      const id = action.payload;
      return state.map((ele) =>
        ele.id === id ? { ...ele, votes: ele.votes + 1 } : ele
      );
    },
    newAnecdote(state, action) {
      const content = action.payload;
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0,
      };
      state.push(newAnecdote);
    },
    setAnecdote(state, action){
      return action.payload
    }
  },
});

export const { newAnecdote, registerVote, setAnecdote } = anecdoteSlice.actions;

export const initializeAnecdote = () =>{
  return async dispatch => {
    const data = await getAll()
    dispatch(setAnecdote(data))
  }
} 
export default anecdoteSlice.reducer;