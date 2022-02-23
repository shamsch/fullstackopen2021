import React, { useState } from "react";

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

  return (
    <div style={blogStyle}>
      <div>
        <p>
          {blog.title} {" "}
          <button onClick={() => (view ? setView(false) : setView(true))}>
            view
          </button>
        </p>
        <p style={stylesForDetail}>{blog.url}</p>
        <p style={stylesForDetail}>{blog.likes} <button>like</button></p>
        <p style={stylesForDetail}>{blog.author}</p>
      </div>
    </div>
  );
};
