import React, { useState, useEffect } from "react";

//backend services
import { getAll, logUserIn, createBlog, setToken } from "./services/blogs";

//components
import { Blog } from "./components/Blog";
import { Login } from "./components/Login";
import { CreateNewBlog } from "./components/CreateNewBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [saveBlog, setSaveBlog] = useState(null);

  const makeLogin = async (username, password) => {
    const res = await logUserIn(username, password);
    window.localStorage.setItem("user", JSON.stringify(res));
    setUser(res);
  };

  const handleBlogCreate = async (blog) => {
    setToken(user.token);
    const res = await createBlog(blog);
    setSaveBlog(res);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
    const getUserFromLocal = window.localStorage.getItem("user");

    //check if already user is logged in
    if (getUserFromLocal) {
      setUser(JSON.parse(getUserFromLocal));
    }
  }, [saveBlog]);

  return (
    <div>
      {!user ? (
        <Login makeLogin={makeLogin} />
      ) : (
        <>
          <h1> blogs </h1>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <CreateNewBlog handleBlogCreate={handleBlogCreate} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
