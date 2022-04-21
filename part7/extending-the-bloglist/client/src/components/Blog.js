//liking and deleting works as normal after using redux state so i guess it's done too
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { deleteUser, setToken } from "../services/blogs";
import DeleteIcon from '@mui/icons-material/Delete'
// import { updateBlogLike } from "../services/blogs";

export const Blog = ({ blog }) => {
  // const [view, setView] = useState(false);

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  // const stylesForDetail = {
  //   display: view ? "" : "none",
  // };

  // const handleLikeClick = async (blogToUpdate) => {
  //   const updatedBlog = {
  //     ...blogToUpdate,
  //     likes: blogToUpdate.likes + 1,
  //   };
  //   const res = await updateBlogLike(updatedBlog);
  //   console.log("Blog update complete: ", res);
  // };

  const handleRemove = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
      )
    ) {
      setToken();

      try {
        const res = await deleteUser(blogToDelete);
        if (res) {
          window.alert("Blog removed");
        }
        console.log("Deleted status:", res);
        window.location.reload()
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        margin: "10px",
        "&:hover": {
          background: "lightgrey",
        },
      }}
    >
      <>
       
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
             <Link to={`/blog/${blog.id}`} style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ textTransform: "capitalize" }}
            >
              {blog.title}
            </Typography>
            </Link>
            <IconButton color="warning" aria-label="delete" onClick={() => handleRemove(blog)}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        

        {/* <CardContent>
          <Typography variant="h5" component="div" sx={{ margin: "10px" }}>
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>{" "}
          </Typography>
        </CardContent> */}
        {/* <button className="view" onClick={() => (view ? setView(false) : setView(true))}>
          view
        </button>
        <p style={stylesForDetail} className="url">
          {blog.url}
        </p>
        <p style={stylesForDetail} className="like">
          {blog.likes}{" "}
          <button className="like-btn" onClick={() => handlerFunction? handlerFunction() : handleLikeClick(blog)}>like</button>
        </p>
        <p className="author" style={stylesForDetail}>
          {blog.author}
        </p> */}
        {/* <button onClick={() => handleRemove(blog)} id={"remove"}>remove</button> */}
      </>
    </Card>
  );
};
