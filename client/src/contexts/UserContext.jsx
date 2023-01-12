import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({ username: "" });

  const setUsername = (username) => {
    setUser({ ...user, username });
  };

  return (
    <UserContext.Provider value={{ user, setUsername }}>
      {props.children}
    </UserContext.Provider>
  );
};
