import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import { Login } from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const makeLogin = async (username, password) => {
    const res = await blogService.logUserIn(username, password);
    window.localStorage.setItem("user", JSON.stringify(res));
    setUser(res);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const getUserFromLocal = window.localStorage.getItem("user");

    //check if already user is logged in
    if (getUserFromLocal) {
      setUser(JSON.parse(getUserFromLocal));
    }
  }, []);

  return (
    <div>
      {!user ? (
        <Login makeLogin={makeLogin} />
      ) : (
        <>
          <h1> blogs </h1>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
