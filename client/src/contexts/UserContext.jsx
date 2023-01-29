import { createContext, useState, useContext } from "react";
import axios from "../utils/axios";
import { SocketContext } from "./SocketContext";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const { socket } = useContext(SocketContext);

  const [user, setUser] = useState({});

  const loginUser = () => {
    const authToken = sessionStorage.getItem("auth-token--chatsoft");
    axios
      .get("/auth/me", { headers: { "auth-token": authToken } })
      .then(({ data }) => {
        if (data.success) {
          setUser(data.user);
          socket.emit("userConnected", data.user._id);
        }
      });
  };

  return (
    <UserContext.Provider value={{ user, loginUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
