import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import ChatFooter from "../chatFooter/ChatFooter";
import "./Chat.css";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__messageContainer">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat__message ${
              message.socketID === socket.id ? "sentMessage" : "receivedMessage"
            }`}
          >
            {message.socketID !== socket.id && <span>{message.username}</span>}
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={lastMessageRef}></div>
      </div>
      <ChatFooter socket={socket} />
    </div>
  );
};

export default Chat;
