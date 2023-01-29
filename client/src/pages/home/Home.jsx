import { useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import { SocketContext } from "../../contexts/SocketContext";
import { UserContext } from "../../contexts/UserContext";
import { ActiveUsersContext } from "../../contexts/ActiveUsersContext";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { loginUser } = useContext(UserContext);
  const {
    activeUsers,
    fetchUsers,
    handleUserConnected,
    handleUserDisconnected,
  } = useContext(ActiveUsersContext);

  useEffect(() => {
    if (sessionStorage.getItem("auth-token--chatsoft")) {
      loginUser();
      fetchUsers();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    socket.on("userConnected", (userId) => {
      handleUserConnected(userId);
    });

    socket.on("userDisconnected", (userId) => {
      handleUserDisconnected(userId);
    });

    return () => {
      socket.off("userConnected");
      socket.off("userDisconnected");
    };
  }, [socket, activeUsers]);

  return (
    <div className="home">
      <Navbar />
      <div className="home__container">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
