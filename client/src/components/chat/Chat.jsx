import { useEffect, useRef, useContext } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useImmer } from "use-immer";

import axios from "../../utils/axios";
import ChatFooter from "../chatFooter/ChatFooter";

import { SocketContext } from "../../contexts/SocketContext";
import { ActiveUsersContext } from "../../contexts/ActiveUsersContext";

import "./Chat.css";

export async function loader({ params }) {
  const selectedUserId = params.selectedUserId;
  const authToken = sessionStorage.getItem("auth-token--chatsoft");

  const { data } = await axios.post(
    "/chat/init",
    { user_id: selectedUserId },
    { headers: { "auth-token": authToken } }
  );

  return data.chat_id;
}

const Chat = () => {
  const lastMessageRef = useRef(null);

  const { selectedUserId } = useParams();
  const chatId = useLoaderData();

  const { socket } = useContext(SocketContext);
  const { activeUsers } = useContext(ActiveUsersContext);

  const [selectedUser, setSelectedUser] = useImmer({
    fullname: "User",
    messages: [],
  });

  const fetchMessages = () => {
    const authToken = sessionStorage.getItem("auth-token--chatsoft");
    axios
      .post(
        "/chat/fetch",
        { chat_id: chatId },
        { headers: { "auth-token": authToken } }
      )
      .then(({ data }) => {
        if (data.success) {
          setSelectedUser((draft) => {
            draft.messages = data.messages;
          });
        }
      });
  };

  const handleSentMessage = (message) => {
    setSelectedUser((draft) => {
      draft.messages.push(message);
    });
  };

  useEffect(() => {
    setSelectedUser((draft) => {
      draft.messages = [];
    });

    const slctUser = activeUsers.find((user) => user._id === selectedUserId);
    setSelectedUser((draft) => {
      draft.fullname = slctUser.fullname;
    });

    fetchMessages();
  }, [selectedUserId]);

  useEffect(() => {
    socket.on("privateMessageResponse", ({ message }) => {
      setSelectedUser((draft) => {
        draft.messages.push(message);
      });
    });

    return () => {
      socket.off("privateMessageResponse");
    };
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [selectedUser]);

  return (
    <div className="chat">
      <div className="chat__header">{selectedUser.fullname}</div>
      <div className="chat__messageContainer">
        {selectedUser.messages.map((message, i) => (
          <div
            key={i}
            className={`chat__message ${
              message.fromUserId === selectedUserId
                ? "receivedMessage"
                : "sentMessage"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
        <div ref={lastMessageRef}></div>
      </div>
      <ChatFooter
        selectedUserId={selectedUserId}
        chatId={chatId}
        handleSentMessage={handleSentMessage}
      />
    </div>
  );
};

export default Chat;
