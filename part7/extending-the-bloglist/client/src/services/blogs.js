import axios from "axios";
const baseUrl = "/api/blogs";
const loginUrl = "/api/login";

let token = null;

export const setToken = (newToken) => {
  if(newToken===undefined){
    const getUserFromLocal = window.localStorage.getItem("user");
    const user= JSON.parse(getUserFromLocal)
    newToken=user.token;
  }
  token = `bearer ${newToken}`;
  //console.log(token);
};

export const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export const createBlog = async (blog) => {
  const config = {
    headers: { authorization: token },
  };
  const res = await axios.post(baseUrl, blog, config);
  return res.data;
};

export const logUserIn = async (username, password) => {
  const res = await axios.post(loginUrl, { username, password });
  return res.data;
};

export const updateBlogLike = async (blog) => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return res.data;
};

export const deleteUser = async (user) => {
  const config = {
    headers: { authorization: token },
  };
  const res = await axios.delete(`${baseUrl}/${user.id}`, config);
  return res;
};