import { createContext } from "react";
import { useImmer } from "use-immer";

export const ActiveUsersContext = createContext();

export const ActiveUsersProvider = (props) => {
  const [activeUsers, setActiveUsers] = useImmer([]);

  const handleUsers = (users) => {
    setActiveUsers([...users]);
  };

  const handleNewUserRespone = (user) => {
    setActiveUsers([...activeUsers, user]);
  };

  const disconnectUser = (disconnectedSocetID) => {
    setActiveUsers((draft) => {
      const disconnectedUser = draft.find(
        (user) => user.socketID === disconnectedSocetID
      );
      if (disconnectedUser) disconnectedUser.isConnected = false;
    });
  };

  const handleNewMessage = (message, socketID) => {
    setActiveUsers((draft) => {
      const msgUser = draft.find((user) => user.socketID === socketID);
      msgUser.messages.push(message);
    });
  };

  return (
    <ActiveUsersContext.Provider
      value={{
        activeUsers,
        handleUsers,
        handleNewUserRespone,
        disconnectUser,
        handleNewMessage,
      }}
    >
      {props.children}
    </ActiveUsersContext.Provider>
  );
};

/*
activeUsers = [
  {
    username: "Wade Wilson",
    socketID: "ldjfa843904j5",
    isConnected: true,
    hasNewMessages: true,
    messages: [
      {
        text: "Hello",
        id: "afsdfsdfasd9f",
        fromSelf: false
      },
      {
        text: "Hello",
        id: "afsdf8ddsd9f"
        fromSelf: true
      },
      {
        text: "Hello",
        id: "afsdwwasd9f"
        fromSelf: false
      },
    ]
  },
  {
    username: "Wade Wilson",
    socketID: "ldjfa843904j5",
    isConnected: false,
    hasNewMessages: false,
    messages: [
      {
        text: "Hello",
        id: "afsdfsdfasd9f"
        fromSelf: true
      },
      {
        text: "Hello",
        id: "afsdf8ddsd9f"
        fromSelf: false
      },
      {
        text: "Hello",
        id: "afsdwwasd9f"
        fromSelf: true
      },
    ]
  },
]
*/
