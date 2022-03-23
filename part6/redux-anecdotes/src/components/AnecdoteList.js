import { useSelector, useDispatch } from "react-redux";

import { registerVote } from "../reducers/anecdoteReducer";
import {voteMessage, clearNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdote);
  const filter = useSelector((state) => state.filter);

  const filteredAnecdote = anecdotes.filter((anecdote)=>{
    if(anecdote.content.includes(filter)){
      return anecdote
    }
  })

  const sortAnecdotes = [...filteredAnecdote]
  sortAnecdotes.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1;
    } else {
      return 1;
    }
  })

  const vote = (anecdote) => {
    dispatch(registerVote(anecdote.id));
    dispatch(voteMessage(anecdote.content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 500);
  }

  return sortAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
