import React, { useState } from "react";
import { Notification } from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import { changeCreateNoteNotification } from "../reducer/notificationReducer";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

const DEFAULT_BLOG = {
  title: "",
  author: "",
  url: "",
};

export const CreateNewBlog = ({ handleBlogCreate }) => {
  const [newBlog, setNewblog] = useState(DEFAULT_BLOG);
  const showNotif = useSelector((state) => state.notification.createNote);
  const dispatch = useDispatch();
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
      {!show && (
        <Button
          variant="contained"
          sx={{ marginLeft: "20px", marginBottom: "15px" }}
          id={"newblog"}
          onClick={() => setShow(true)}
        >
          new blog
        </Button>
      )}
      <div style={showStyles}>
        <Typography variant="h5" component="h2" sx={{ margin: "20px" }}>
          Create new
        </Typography>
        {(showNotif) ? (
          <Notification color={"green"} text={"Blog added sucessfully"} />
        ) : null}
        <FormControl>
          <Box>
            <TextField
              sx={{ margin: "20px", display: "block" }}
              type="text"
              label="title"
              onChange={(e) =>
                setNewblog({ ...newBlog, title: `${e.target.value}` })
              }
              value={newBlog.title}
              className="title"
              variant="filled"
            />
            <TextField
              sx={{ margin: "20px", display: "block" }}
              label="author"
              variant="filled"
              type="text"
              onChange={(e) =>
                setNewblog({ ...newBlog, author: `${e.target.value}` })
              }
              value={newBlog.author}
              className="author"
            />
            <TextField
              sx={{ margin: "20px", display: "block" }}
              label="url"
              variant="filled"
              type="url"
              onChange={(e) =>
                setNewblog({ ...newBlog, url: `${e.target.value}` })
              }
              value={newBlog.url}
              className="url"
            />
            <Button
              variant="contained"
              className="create"
              color="success"
              sx={{ margin: "20px", display: "block" }}
              onClick={(e) => handleSubmit(e)}
            >
              create
            </Button>
            <Button
              color="warning"
              variant="contained"
              sx={{ margin: "20px", display: "block" }}
              onClick={() => {
                setShow(false);
              }}
              className="cancel"
            >
              cancel
            </Button>
          </Box>
        </FormControl>
      </div>
    </div>
  );
};
