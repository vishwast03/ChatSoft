import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import { UserContext } from "./contexts/UserContext";
import "./App.css";

const App = ({ socket }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="app__container">
        <Sidebar socket={socket} />
        <Chat socket={socket} />
      </div>
    </div>
  );
};

export default App;
