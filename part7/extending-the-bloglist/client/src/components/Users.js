import React, { useEffect, useState } from "react";
import {} from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { allUser } from "../services/blogs";
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
      <h1>Users</h1>
      {users ? (
        <table>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td> <Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </table>
      ) : (
        <></>
      )}
    </>
  );
}
