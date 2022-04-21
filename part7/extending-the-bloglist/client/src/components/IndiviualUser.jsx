import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Avatar,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allUser } from "../services/blogs";
import Navbar from "./Navbar";

function IndiviualUser() {
  const [user, setUser] = useState(null);
  const param = useParams();

  useEffect(() => {
    allUser().then((res) => {
      let retrievedUser = res.data.filter((user) => user.id === param.id);
      setUser(retrievedUser[0]);
    });
  }, []);

  return (
    <>
      <Navbar />
      {user ? (
        <>
          <Card>
            <CardContent>
              <Typography
                sx={{ display: "flex", textTransform: "capitalize" }}
                variant="h4"
              >
                <Avatar sx={{ mr: "10px", mb: "15px" }}>
                  {user.name.charAt(0)}
                </Avatar>
                {user.name}
              </Typography>
              <Typography fontWeight="bold" fontSize="20px" variant="p">
                Added blogs
              </Typography>
              <List>
                {user.blogs.map((blog) => {
                  return <ListItem key={blog.id}>- {blog.title}</ListItem>;
                })}
              </List>
            </CardContent>
          </Card>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default IndiviualUser;
