import { Server } from "socket.io";

let io;
const userSocketMap = new Map();

export function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    // your socket event handlers here
  });
}

export { io, userSocketMap };
