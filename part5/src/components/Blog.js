import React, { useState } from "react";
import { updateUserLike } from "../services/blogs";

export const Blog = ({blog}) => {
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
    const res = await updateUserLike(updatedBlog);
    console.log("Blog update complete: ", res)
  };

  return (
    <div style={blogStyle}>
      <div>
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
      </div>
    </div>
  );
};
