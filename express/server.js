"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const SocketIo = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
dotenv.config();

app.use(cors());
app.use(express.json());

const server = http.createServer();

const socket = SocketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

socket.on("connection", (socket) => {
  console.log("user connectd");

  socket.on("join-ms", (roomId) => {
    socket / join(roomId);
    console.log(roomId);
  });
  socket.on("disconnected", () => {
    console.log("user disconneted");
  });
});
module.exports = app;
module.exports.handler = serverless(app);
