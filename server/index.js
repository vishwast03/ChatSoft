const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const handleSocketIO = require("./utils/socketio");

const port = 8080;
const server = http.createServer(app);

app.use(cors());
handleSocketIO(server);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
