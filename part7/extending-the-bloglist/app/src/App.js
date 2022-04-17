import React, { useState, useEffect } from "react";

//backend services
import { getAll, logUserIn, createBlog, setToken } from "./services/blogs";

//components
import { Blog } from "./components/Blog";
import { Login } from "./components/Login";
import { CreateNewBlog } from "./components/CreateNewBlog";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, addManyBlog } from "./reducer/blogReducer";


const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null);

  const blogs = useSelector((state)=>state.blog)

  const makeLogin = async (username, password) => {
    try {
      const res = await logUserIn(username, password);
      window.localStorage.setItem("user", JSON.stringify(res));
      setUser(res);
      return res;
    } catch (error) {
      console.log("error found: ", error);
    }
  };

  const handleBlogCreate = async (blog) => {
    setToken(user.token);
    const res = await createBlog(blog);
    console.log(res)
    dispatch(addBlog(res));
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  useEffect(() => {
    getAll().then((res) => {
      res.sort((a, b) => b.likes - a.likes);
      dispatch(addManyBlog(res));
    });

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
          <button onClick={handleLogout} className={"logout"}>
            logout
          </button>
          <CreateNewBlog handleBlogCreate={handleBlogCreate} />
          <div className="blogs">
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
