import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { UserContext } from "../../contexts/UserContext";
import "./ChatFooter.css";

const ChatFooter = ({ socket }) => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      socket.emit("message", {
        text: message,
        username: user.username,
        id: nanoid(),
        socketID: socket.id,
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
