import { useContext, useEffect } from "react";
import Home from "./pages/home/Home";
import { ActiveUsersContext } from "./contexts/ActiveUsersContext";
import "./App.css";

const App = ({ socket }) => {
  const { handleNewMessage } = useContext(ActiveUsersContext);

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
