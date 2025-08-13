import React, { useEffect, useState } from "react";
import "./Users.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${backendUrl}/api/user`) 
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-message">Loading users...</div>;
  }

  if (!users.length) {
    return <div className="empty-message">No users found.</div>;
  }

  return (
    <div className="page-container">
      <h1 className="datasets-title">User Emails</h1>

      <div className="users-grid">
        {users.map((user, index) => (
          <div className="user-box" key={index}>
            <p className="user-email">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
