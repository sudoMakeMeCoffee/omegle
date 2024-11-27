import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to omegle");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let connectedUsers = [];
let usersQue = [];

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  io.to(socket.id).emit("userConnect", socket.id);
  connectedUsers.push(socket.id);

  io.emit("userlist", connectedUsers);

  socket.on("msg", (data) => {
    io.to(data.to).emit("msg", data);
  });

  socket.on("typing", (data) => {
    io.to(data.to).emit("typing", data);
  });

  socket.on("start", (socketId) => {
    usersQue.push(socketId);
    console.log(usersQue);
    if (usersQue.length > 1) {
      const user1 = usersQue.shift();
      const user2 = usersQue.shift();
      io.to(user1).emit("pair", user2);
      io.to(user2).emit("pair", user1);
      console.log("Paired: " + user1 + " and " + user2);
      console.log(usersQue);
    }
  });

  socket.on("stop", (data) => {
    io.to(data.to).emit("stop", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
    connectedUsers = connectedUsers.filter((user) => user !== socket.id);
    io.emit("userlist", connectedUsers);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
