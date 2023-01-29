import { createContext } from "react";
import { useImmer } from "use-immer";
import axios from "../utils/axios";

export const ActiveUsersContext = createContext();

export const ActiveUsersProvider = (props) => {
  const [activeUsers, setActiveUsers] = useImmer([]);

  const fetchUsers = () => {
    const authToken = sessionStorage.getItem("auth-token--chatsoft");
    axios
      .get("/users/get", { headers: { "auth-token": authToken } })
      .then(({ data }) => {
        if (data.success) {
          setActiveUsers(data.users);
        }
      });
  };

  const handleUserConnected = (userId) => {
    setActiveUsers((draft) => {
      const connectedUser = draft.find((user) => user._id === userId);
      if (connectedUser) connectedUser.isConnected = true;
    });
  };

  const handleUserDisconnected = (userId) => {
    setActiveUsers((draft) => {
      const disconnectedUser = draft.find((user) => user._id === userId);
      if (disconnectedUser) disconnectedUser.isConnected = false;
    });
  };

  return (
    <ActiveUsersContext.Provider
      value={{
        activeUsers,
        fetchUsers,
        handleUserConnected,
        handleUserDisconnected,
      }}
    >
      {props.children}
    </ActiveUsersContext.Provider>
  );
};
