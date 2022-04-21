import {
  Avatar,
  Button,
  Card,
  CardContent,
  Input,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
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

    if (updateComment) {
      setUpdateComment(false);
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
    setComment("");
    console.log(res);
  };

  if (blog) {
    return (
      <div>
        <Navbar />
        <Card variant="outlined" sx={{ margin: "10px" }}>
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textTransform: "capitalize" }}
            >
              {blog.title}
            </Typography>
            <Link href={`${blog.url}`}>{blog.url}</Link>

            <Typography variant="p" component="div" sx={{ margin: "10px" }}>
              {blog.likes} likes{" "}
              <Button
                sx={{ ml: "10px" }}
                variant="outlined"
                onClick={() => handleLike(blog)}
              >
                like
              </Button>
              <br />
              added by {blog.author}
            </Typography>

            <Typography variant="h4" component="div">
              Comments
            </Typography>
            <Input
              margin="dense"
              placeholder="your comment here"
              sx={{ margin: "10px" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ display: "block", margin: "10px" }}
              onClick={handleCommentSubmit}
            >
              {" "}
              add{" "}
            </Button>

            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {blog.comments.map((comment, index) => (
                <div key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={index}>
                       <PersonIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText> {comment}</ListItemText>
                  </ListItem>
                </div>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default BlogPage;
