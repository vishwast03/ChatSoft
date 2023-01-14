import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { UserContext } from "../../contexts/UserContext";
import "./ChatFooter.css";

const ChatFooter = ({ socket, messages, setMessages }) => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const messageData = {
        text: message,
        username: user.username,
        id: nanoid(),
        socketID: socket.id,
      };

      setMessages([...messages, messageData]);

      socket.emit("message", messageData);
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
