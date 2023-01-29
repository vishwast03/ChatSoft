import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Login from "./pages/login/Login";
import Error from "./pages/error/Error";
import Index from "./components/index/Index";
import Chat, { loader as chatLoader } from "./components/chat/Chat";
import Signup from "./pages/signup/Signup";

import { SocketProvider } from "./contexts/SocketContext";
import { UserProvider } from "./contexts/UserContext";
import { ActiveUsersProvider } from "./contexts/ActiveUsersContext";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Index /> },
      { path: "/:selectedUserId", element: <Chat />, loader: chatLoader },
    ],
  },
  { path: "/login", element: <Login />, errorElement: <Error /> },
  { path: "/signup", element: <Signup />, errorElement: <Error /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <UserProvider>
        <ActiveUsersProvider>
          <RouterProvider router={router} />
        </ActiveUsersProvider>
      </UserProvider>
    </SocketProvider>
  </React.StrictMode>
);
