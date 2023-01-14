import { useEffect } from "react";
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ socket }) => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (users) => {
      setActiveUsers(users);
    });
  }, [socket, activeUsers]);

  return (
    <div className="sidebar">
      <h2 className="sidebar__header">Active Users</h2>

      <ul className="sidebar__userList">
        {activeUsers.map((user) => (
          <li key={user.socketID}>{`${user.username} ${
            user.socketID === socket.id ? "(You)" : ""
          }`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
