import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import ChatFooter from "../chatFooter/ChatFooter";
import { ActiveUsersContext } from "../../contexts/ActiveUsersContext";
import "./Chat.css";

const Chat = () => {
  const lastMessageRef = useRef(null);
  const { selectedSocketID } = useParams();
  const { activeUsers } = useContext(ActiveUsersContext);
  const [selectedUser, setSelectedUser] = useState({
    username: "User",
    messages: [],
  });

  useEffect(() => {
    const slctUser = activeUsers.find(
      (user) => user.socketID === selectedSocketID
    );
    setSelectedUser(slctUser);
  }, [activeUsers, selectedSocketID]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [selectedUser]);

  return (
    <div className="chat">
      <div className="chat__header">{selectedUser.username}</div>
      <div className="chat__messageContainer">
        {selectedUser.messages.map((message) => (
          <div
            key={message.id}
            className={`chat__message ${
              message.fromSelf ? "sentMessage" : "receivedMessage"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={lastMessageRef}></div>
      </div>
      <ChatFooter selectedSocketID={selectedSocketID} />
    </div>
  );
};

export default Chat;
