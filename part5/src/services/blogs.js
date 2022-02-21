import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl= '/api/login'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const logUserIn = async (username, password) => {
  const request = await axios.post(loginUrl, {username, password})
  return request.data
}

export default { getAll,logUserIn }