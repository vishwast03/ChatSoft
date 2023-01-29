import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { ActiveUsersContext } from "../../contexts/ActiveUsersContext";
import { SocketContext } from "../../contexts/socket";
import "./ChatFooter.css";

const ChatFooter = ({ selectedSocketID }) => {
  const [message, setMessage] = useState("");
  const { handleNewMessage } = useContext(ActiveUsersContext);
  const { socket } = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const messageData = {
        text: message,
        id: nanoid(),
        fromSelf: true,
      };

      handleNewMessage(messageData, selectedSocketID);

      socket.emit("privateMessage", {
        message: messageData,
        to: selectedSocketID,
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
