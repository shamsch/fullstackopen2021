import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { Login } from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const makeLogin = async (username, password) => {
    const res = await blogService.logUserIn(username, password);
    setUser(res);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {!user ? (
        <Login makeLogin={makeLogin} />
      ) : (
        <>
          <h1> blogs </h1>
          <p>{user.username} logged in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
