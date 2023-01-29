import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import App from "./App";
import Login from "./pages/login/Login";
import Error from "./pages/error/Error";
import Index from "./components/index/Index";
import Chat from "./components/chat/Chat";
import { UserProvider } from "./contexts/UserContext";
import { ActiveUsersProvider } from "./contexts/ActiveUsersContext";
import "./index.css";
import Signup from "./pages/signup/Signup";

const socket = io("http://127.0.0.1:8080");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App socket={socket} />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Index /> },
      { path: "/:selectedSocketID", element: <Chat socket={socket} /> },
    ],
  },
  {
    path: "/login",
    element: <Login socket={socket} />,
    errorElement: <Error />,
  },
  { path: "/signup", element: <Signup />, errorElement: <Error /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ActiveUsersProvider>
        <RouterProvider router={router} />
      </ActiveUsersProvider>
    </UserProvider>
  </React.StrictMode>
);
