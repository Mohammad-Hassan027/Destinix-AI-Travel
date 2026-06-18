import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    // Connect to backend (typically on port 3000 in dev, or origin in prod)
    const socketUrl = window.location.origin.includes("5173")
      ? window.location.origin.replace("5173", "3000")
      : window.location.origin;
      
    socket = io(socketUrl, {
      transports: ["websocket", "polling"],
      autoConnect: true
    });
  }
  return socket;
};
