const { Server } = require("socket.io");
const mongoose = require("mongoose");

const User = require("../models/user");
const Message = require("../models/message");

const handleSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("userConnected", async (userId) => {
      socket.data.userId = userId;
      socket.join(userId);

      socket.broadcast.emit("userConnected", userId);

      const user = await User.findById(userId);
      user.isConnected = true;
      user.save();
    });

    socket.on("privateMessage", ({ message, to }) => {
      const newMessage = {
        _id: `msg_${new mongoose.Types.ObjectId().toString()}`,
        ...message,
      };
      socket.to(to).emit("privateMessageResponse", { message: newMessage });

      Message.create(newMessage);
    });

    socket.on("disconnect", async () => {
      console.log("user disconnected");

      socket.broadcast.emit("userDisconnected", socket.data.userId);

      const user = await User.findById(socket.data.userId);
      user.isConnected = false;
      user.save();

      socket.disconnect();
    });
  });
};

module.exports = handleSocketIO;
