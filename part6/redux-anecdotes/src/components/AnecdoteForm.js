import { useDispatch } from "react-redux";

import { createAnecdote, newAnecdote } from "../reducers/anecdoteReducer";
import {createMessage,clearNotification, setNotification} from "../reducers/notificationReducer"

import { addAnecdote } from "../services/anecdote";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = (event) => {
    event.preventDefault();
    const anecdoteData = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(anecdoteData))

    //notification handling 
    dispatch(setNotification(`added ${anecdoteData}`, 10))
    // dispatch(createMessage(anecdoteData));
    // setTimeout(() => {
    //   dispatch(clearNotification())
    // }, 500);
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
