const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectToDB = require("./utils/db");
const handleSocketIO = require("./utils/socketio");

const port = 8080;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectToDB();
handleSocketIO(server);

app.use("/auth", require("./routes/auth"));

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
