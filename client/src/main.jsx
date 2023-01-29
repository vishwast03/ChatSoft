import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/Login";
import Error from "./pages/error/Error";
import Index from "./components/index/Index";
import Chat from "./components/chat/Chat";
import Signup from "./pages/signup/Signup";
import { UserProvider } from "./contexts/UserContext";
import { ActiveUsersProvider } from "./contexts/ActiveUsersContext";
import { SocketProvider } from "./contexts/socket";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Index /> },
      { path: "/:selectedSocketID", element: <Chat /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
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
