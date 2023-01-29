import { useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ActiveUsersContext } from "../../contexts/ActiveUsersContext";
import { SocketContext } from "../../contexts/socket";
import { UserContext } from "../../contexts/UserContext";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { activeUsers, handleUsers, handleNewUserRespone, disconnectUser } =
    useContext(ActiveUsersContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    socket.on("users", (users) => {
      handleUsers(users);
    });

    socket.on("newUserResponse", (user) => {
      handleNewUserRespone(user);
    });

    socket.on("userDisconnected", (disconnectedSocetID) => {
      disconnectUser(disconnectedSocetID);
    });

    return () => {
      socket.off("users");
      socket.off("newUserResponse");
      socket.off("userDisconnected");
    };
  }, [socket, activeUsers]);

  return (
    <div className="home">
      <Navbar />
      <div className="home__container">
        <Sidebar socket={socket} />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
