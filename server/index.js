const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./utils/db");
const handleSocketIO = require("./utils/socketio");

const port = 8080;
const server = http.createServer(app);

app.use(cors());

connectToDB();
handleSocketIO(server);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
