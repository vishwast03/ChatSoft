import { useContext, useEffect } from "react";
import Home from "./pages/home/Home";
import { ActiveUsersContext } from "./contexts/ActiveUsersContext";
import { SocketContext } from "./contexts/socket";
import "./App.css";

const App = () => {
  const { handleNewMessage } = useContext(ActiveUsersContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("privateMessageResponse", ({ message, from }) => {
      handleNewMessage(message, from);
    });

    return () => {
      socket.off("privateMessageResponse");
    };
  }, []);

  return (
    <div className="app">
      <Home socket={socket} />
    </div>
  );
};

export default App;
