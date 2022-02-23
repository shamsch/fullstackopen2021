import React, { useState } from "react";
import { deleteUser, setToken, updateBlogLike } from "../services/blogs";

export const Blog = ({ blog }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const stylesForDetail = {
    display: view ? "" : "none",
  };

  const handleLikeClick = async (blogToUpdate) => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };
    const res = await updateBlogLike(updatedBlog);
    console.log("Blog update complete: ", res);
  };

  const handleRemove = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
      )
    ) {
      setToken();

      try {
        const res = await deleteUser(blogToDelete);
        console.log("Deleted status:", res);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <>
        <p>
          {blog.title}{" "}
          <button onClick={() => (view ? setView(false) : setView(true))}>
            view
          </button>
        </p>
        <p style={stylesForDetail}>{blog.url}</p>
        <p style={stylesForDetail}>
          {blog.likes}{" "}
          <button onClick={() => handleLikeClick(blog)}>like</button>
        </p>
        <p style={stylesForDetail}>{blog.author}</p>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </>
    </div>
  );
};
