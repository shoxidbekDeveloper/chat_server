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
    socket.join(data?.roomId);
    console.log(data.username + data?.roomId);
  });

  socket.on("sendMessage", (data) => {
    console.log(data);
    socket.to(data?.roomId).emit("response-message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

app.use("/", (req, res) => {
  res.send("shoxidbek ");
});

server.listen(port, () => console.log(`run on port ${port}`));
