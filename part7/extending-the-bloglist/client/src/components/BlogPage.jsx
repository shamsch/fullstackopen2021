import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAll, postComment, updateBlogLike } from "../services/blogs";
import Navbar from "./Navbar";

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const param = useParams();

  //used in useEffect to trigger refectching of all blogs which will include the newly posted comment 
  const [updateComment, setUpdateComment] = useState(false);

  useEffect(() => {
    getAll().then((res) => {
      let retrievedBlog = res.filter((blog) => blog.id === param.id);
      setBlog(retrievedBlog[0]);
    });

    if(updateComment){
      setUpdateComment(false)
    }
  }, [updateComment]);

  const handleLike = async (blogToUpdate) => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };
    const res = await updateBlogLike(updatedBlog);
    console.log("Blog update complete: ", res);
    window.location.reload();
  };

  const handleCommentSubmit = async () => {
    const res = await postComment(param.id, comment);
    setUpdateComment(true); 
    setComment("")
    console.log(res)
  };

  if (blog) {
    return (
      <div>
        <Navbar />
        <h1>{blog.title}</h1>
        <a href={`${blog.url}`}>{blog.url}</a>
        <p>
          {blog.likes} likes{" "}
          <button onClick={() => handleLike(blog)}>like</button>{" "}
        </p>
        <p> added by {blog.author}</p>
        <h2>comments</h2>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={handleCommentSubmit}> add </button>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null; 
};

export default BlogPage;
