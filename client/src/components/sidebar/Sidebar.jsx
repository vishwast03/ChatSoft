import { useContext } from "react";
import { Link } from "react-router-dom";
import { ActiveUsersContext } from "../../contexts/ActiveUsersContext";
import { SocketContext } from "../../contexts/socket";
import "./Sidebar.css";

const Sidebar = () => {
  const { activeUsers } = useContext(ActiveUsersContext);
  const { socket } = useContext(SocketContext);

  return (
    <div className="sidebar">
      <h2 className="sidebar__header">Active Users</h2>

      <div className="sidebar__userList">
        {activeUsers.map((user) => (
          <Link key={user.socketID} to={user.socketID}>
            {`${user.username} ${user.socketID === socket.id ? "(You)" : ""}`}
            <span
              className="sidebar__connectionStatus"
              style={user.isConnected ? { color: "green" } : { color: "red" }}
            >
              ●
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
