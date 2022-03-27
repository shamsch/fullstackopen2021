import axios from "axios";

const baseurl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

export const getAll = async () => {
  const res = await axios.get(baseurl);
  return res.data;
};

export const addAnecdote = async (content) => {
  const anecdote = { content, votes: 0, id: getId() };
  const res = await axios.post(baseurl, anecdote);
  return res;
};

