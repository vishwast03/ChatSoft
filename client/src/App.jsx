import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import { io } from "socket.io-client";
import Navbar from "./components/navbar/Navbar";

const socket = io("http://127.0.0.1:8080");

const App = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageValue = e.target[0].value;
    if (messageValue) {
      socket.emit("chat message", messageValue);
      e.target[0].value = "";
    }
  };

  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }

    socket.on("chat message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [socket, messages]);

  return (
    <div className="app">
      <Navbar />
      <ul id="messages">
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
      <form id="message_form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="messageInput"
          placeholder="Message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
