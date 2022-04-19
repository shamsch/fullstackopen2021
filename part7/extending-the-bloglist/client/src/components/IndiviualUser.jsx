import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allUser } from "../services/blogs";
import Navbar from "./Navbar";

function IndiviualUser() {
  const [user, setUser] = useState(null);
  const param = useParams();

  useEffect(() => {
    allUser().then((res) => {
      let retrievedUser = res.data.filter((user) => user.id === param.id);
      setUser(retrievedUser[0]);
    });
  }, []);

  return (
    <>
      <Navbar />
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h3> added blogs </h3>
          <ul>
            {user.blogs.map((blog) => {
              return <li key={blog.id}>{blog.title}</li>;
            })}
          </ul>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default IndiviualUser;
