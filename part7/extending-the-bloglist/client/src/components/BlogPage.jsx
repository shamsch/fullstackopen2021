import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAll, updateBlogLike } from "../services/blogs";
import Navbar from "./Navbar";

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const param = useParams();

  useEffect(() => {
    getAll().then((res) => {
      let retrievedBlog = res.filter((blog) => blog.id === param.id);
      setBlog(retrievedBlog[0]);
    });
  }, []);

  const handleLike = async (blogToUpdate) => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };
    const res = await updateBlogLike(updatedBlog);
    console.log("Blog update complete: ", res);
    window.location.reload()
  };

  return (
    <>
      {blog ? (
        <>
          <Navbar />
          <h1>{blog.title}</h1>
          <a href={`${blog.url}`}>{blog.url}</a>
          <p>
            {blog.likes} likes <button onClick={()=> handleLike(blog)}>like</button>{" "}
          </p>
          <p> added by {blog.author}</p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default BlogPage;
