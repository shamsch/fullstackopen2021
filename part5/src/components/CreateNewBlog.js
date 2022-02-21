import { useState } from "react";
import { Notification } from "./Notification";

const DEFAULT_BLOG = {
  title: "",
  author: "",
  url: "",
};

export const CreateNewBlog = ({ handleBlogCreate }) => {
  const [newBlog, setNewblog] = useState(DEFAULT_BLOG);
  const [showNotif, setShowNotif] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleBlogCreate(newBlog);

    setShowNotif(true);
    setTimeout(() => {
      setShowNotif(false);
    }, 5000);

    setNewblog(DEFAULT_BLOG);
  };

  return (
    <div>
      <h1>Create new</h1>
      {showNotif ? (
        <Notification color={"green"} text={"Blog added sucessfully"} />
      ) : null}
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
