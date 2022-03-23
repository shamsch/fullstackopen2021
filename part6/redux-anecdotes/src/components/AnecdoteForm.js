import { useDispatch } from "react-redux";

import { newAnecdote } from "../reducers/anecdoteReducer";
import {createMessage,clearNotification} from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = (event) => {
    event.preventDefault();
    const anecdoteData = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdote(anecdoteData));
    dispatch(createMessage(anecdoteData));
    setTimeout(() => {
      dispatch(clearNotification())
    }, 500);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
