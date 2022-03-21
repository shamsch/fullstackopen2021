import { useSelector, useDispatch } from "react-redux";

import { registerVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);
  
  anecdotes.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1;
    } else {
      return 1;
    }
  })

  const vote = (id) => {
    dispatch(registerVote(id));
  }

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
