import React, { useEffect, useState } from "react";
import {} from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { allUser } from "../services/blogs";
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
export default function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    allUser().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <>
      <Navbar />

      {users ? (
        <Card>
          <CardContent>
            <Typography variant="h4">Users</Typography>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Blogs created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </TableCell>
                      <TableCell>{user.blogs.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}
