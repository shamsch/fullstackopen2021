import { useState } from "react";

export const CreateNewBlog = ({ handleBlogCreate }) => {
  const [newBlog, setNewblog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newBlog)
    handleBlogCreate(newBlog);
  };

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>title</label>
        <input
          type="text"
          onChange={(e) =>
            setNewblog({ ...newBlog, title: `${e.target.value}` })
          }
        />
        <br />
        <label>author</label>
        <input
          type="text"
          onChange={(e) =>
            setNewblog({ ...newBlog, author: `${e.target.value}` })
          }
        />
        <br />
        <label>url</label>
        <input
          type="url"
          onChange={(e) => setNewblog({ ...newBlog, url: `${e.target.value}` })}
        />
        <br />
        <button>create</button>
      </form>
    </div>
  );
};
