import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const fetchUsers=async()=>{
      try{
        const userList=await axios.get("http://localhost:8080/user/all", {
          method: "GET",
        credentials: "include", // allows session cookies if needed
        });
        setUsers(userList.data);
      }catch(error){
        console.log(error);
      }
    };
    fetchUsers();
  },[]);
  

  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     setUsers((prev) => prev.filter((user) => user.id !== id));
  //   }
  // };

  // const toggleStatus = (id) => {
  //   setUsers((prev) =>
  //     prev.map((user) =>
  //       user.id === id
  //         ? { ...user, status: user.status === "active" ? "blocked" : "active" }
  //         : user
  //     )
  //   );
  // };

  return (
    <div className="content-wrapper">
      <h2 style={{ color: "#7b5c2f", marginBottom: "20px" }}>Manage Users</h2>

      {users.length === 0 ? (
        <p style={{ color: "#9c8b6a" }}>Loading users...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>State</th>
              <th>City</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.mobile}</td>
                <td>{u.state}</td>
                <td>{u.city}</td>
                {/* <td
                  style={{
                    color: u.status === "active" ? "green" : "red",
                    fontWeight: "500",
                  }}
                >
                  {u.status}
                </td> */}
                {/* <td>
                  <button
                    className="approve-btn"
                    onClick={() => toggleStatus(u.id)}
                  >
                    {u.status === "active" ? "Block" : "Unblock"}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
