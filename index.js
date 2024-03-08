const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
var cors = require("cors");

app.use(cors())

app.get("/", (req, res) => {
  res.json({
    messsage: "ok",
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log(msg)
    io.emit("chat message", msg);
  });
  socket.on("message", msg => {
    io.emit("new message", msg)
  });

  socket.on("increase", msg => {
    io.emit("new value", msg);
  })

  socket.on("send message", msg => {
    io.emit("return new message", msg)
  })

  socket.on("update", msg => {
    io.emit("update-data", msg)
  })
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
