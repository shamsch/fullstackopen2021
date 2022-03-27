import { createSlice } from "@reduxjs/toolkit";
import { addAnecdote, getAll } from "../services/anecdote";

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
      const newAnecdote = action.payload;
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

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const res = await addAnecdote(content)
    dispatch(newAnecdote(res.data))
  }
}
export default anecdoteSlice.reducer;