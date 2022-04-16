import React, { useState } from "react";
import { Notification } from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import { changeCreateNoteNotification } from "../reducer/notificationReducer";

const DEFAULT_BLOG = {
  title: "",
  author: "",
  url: "",
};

export const CreateNewBlog = ({ handleBlogCreate }) => {
  const [newBlog, setNewblog] = useState(DEFAULT_BLOG);
  const showNotif = useSelector((state)=> state.notification.createNote);
  console.log(showNotif)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  const showStyles = { display: show ? "" : "none" };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleBlogCreate(newBlog);

    dispatch(changeCreateNoteNotification());
    setTimeout(() => {
      dispatch(changeCreateNoteNotification());
    }, 5000);

    setNewblog(DEFAULT_BLOG);
  };

  return (
    <div>
      {!show && <button id={"newblog"} onClick={() => setShow(true)}>new blog</button>}
      <div style={showStyles}>
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
            value={newBlog.title}
            className="title"
          />
          <br />
          <label>author</label>
          <input
            type="text"
            onChange={(e) =>
              setNewblog({ ...newBlog, author: `${e.target.value}` })
            }
            value={newBlog.author}
            className="author"
          />
          <br />
          <label>url</label>
          <input
            type="url"
            onChange={(e) =>
              setNewblog({ ...newBlog, url: `${e.target.value}` })
            }
            value={newBlog.url}
            className="url"
          />
          <br />
          <button className="create">create</button>
        </form>
        <button
          onClick={() => {
            setShow(false);
          }}
          className="cancel"
        >
          cancel
        </button>
      </div>
    </div>
  );
};
