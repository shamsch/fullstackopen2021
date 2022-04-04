import { connect } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification} from "../reducers/notificationReducer"


const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const add = (event) => {
    event.preventDefault();
    const anecdoteData = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createAnecdote(anecdoteData)

    //notification handling 
    props.setNotification(`added ${anecdoteData}`, 10)
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

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  setNotification, 
  createAnecdote,
};

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm;
