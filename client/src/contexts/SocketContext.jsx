import { createContext } from "react";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:8080");
export const SocketContext = createContext();

export const SocketProvider = (props) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};
