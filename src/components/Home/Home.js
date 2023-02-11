import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUserDelete = (id) => {
    const proceed = window.confirm("Are you sure you want to delete?");
    if (proceed) {
      console.log("deleting user with id, ", id);
      const url = `http://localhost:5000/user/${id}`;
      console.log(url);
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            console.log("deleted");
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
          }
        });
    }
  };
  return (
    <div>
      <h1>This is Home</h1>
      <div style={{ marginLeft: "auto" }}>
        <h1>Total Users:{users.length}</h1>
        <ul>
          {users.map((user) => (
            <li
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "left",
                marginLeft: "100px",
              }}
              key={user._id}
            >
              id: {user._id} Name:{user.name} Email: {user.email}
              <Link to={`/update/${user._id}`}>
                <button>Update</button>
              </Link>
              <button onClick={() => handleUserDelete(user._id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
