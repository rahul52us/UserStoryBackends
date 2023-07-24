import { Server } from "socket.io";
import http from "http";

const setupSocket = (server: http.Server) => {
  let onlineUsers: any = [];
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("user_connected", (userData) => {
      onlineUsers[socket.id] = userData;

      console.log(userData)
      socket.broadcast.emit("user-status-change", {
        userData: userData,
        socketId: socket.id,
        status: "online",
      });
    });

    socket.on("typing-status", (typingCreator) => {
      socket.broadcast.emit("recieved-typing-status", {
        userData: { ...typingCreator },
        socketId: socket.id,
      });

      console.log("rahul")

    });


    socket.on("joinRoom", (room_id) => {
      // Handle joinRoom event
      // ...
    });

    socket.on("disconnect", () => {
      delete onlineUsers[socket.id];
      socket.broadcast.emit("user-status-change", {
        socketId: socket.id,
        status: "offline",
      });
    });
  });
};

export { setupSocket };
