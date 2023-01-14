import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import App from "./App";
import Login from "./pages/login/Login";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import Error from "./pages/error/Error";

const socket = io("http://127.0.0.1:8080");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App socket={socket} />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login socket={socket} />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
