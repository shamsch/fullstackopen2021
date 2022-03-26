import axios from "axios";

const baseurl = "http://localhost:3001/anecdotes"

export const getAll = async () => {
    const res= await axios.get(baseurl)
    return res
}