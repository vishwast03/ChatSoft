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

  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
