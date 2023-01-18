const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

const port = 8080;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

let users = [];

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);
  socket.join(socket.id);

  socket.on("newUser", (data) => {
    const newUser = {
      ...data,
      isConnected: true,
      messages: [],
    };
    users.push(newUser);

    socket.emit("users", users);

    socket.broadcast.emit("newUserResponse", newUser);
  });

  socket.on("privateMessage", ({ message, to }) => {
    socket.to(to).emit("privateMessageResponse", {
      message: { ...message, fromSelf: false },
      from: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("userDisconnected", socket.id);
    socket.disconnect();
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
