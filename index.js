const express = require("express");
const app = express();
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const server = require("http").Server(app);

// Middleware
app.use(cors());
app.use(express.json());

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

dotenv.config();
const port = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("ms-join", (data) => {
    socket.join("123");
    console.log(data.username);
  });

  socket.on("sendMessage", (data) => {
    console.log(data);
    socket.to("123").emit("response-message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

app.use("/", (req, res) => {
  res.send("Chat server ");
});

server.listen(port, () => console.log(`run on port ${port}`));
