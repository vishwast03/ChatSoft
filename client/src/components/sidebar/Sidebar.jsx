import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { ActiveUsersContext } from "../../contexts/ActiveUsersContext";

import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const { activeUsers } = useContext(ActiveUsersContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">{user.fullname}</div>
      <h2 className="sidebar__header">Active Users</h2>

      <div className="sidebar__userList">
        {activeUsers.map((user) => (
          <Link key={user._id} to={user._id}>
            {user.fullname}
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
