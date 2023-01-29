import { useContext, useState } from "react";

import { SocketContext } from "../../contexts/SocketContext";
import { UserContext } from "../../contexts/UserContext";

import "./ChatFooter.css";

const ChatFooter = ({ selectedUserId, chatId, handleSentMessage }) => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const messageData = {
        text: message,
        fromUserId: user._id,
        chat_id: chatId,
      };

      handleSentMessage(messageData);

      socket.emit("privateMessage", {
        message: messageData,
        to: selectedUserId,
      });
      setMessage("");
    }
  };

  return (
    <div className="chatFooter">
      <form className="chatFooter__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="messageInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatFooter;
