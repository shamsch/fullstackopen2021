import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res)=> res.data)
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const remove = (id) =>{
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response)=>response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { create, getAll, remove, update };
