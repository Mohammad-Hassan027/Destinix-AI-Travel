import { Server, Socket } from "socket.io";

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Real-time collaboration: client connected, socket id =", socket.id);

    // Join a room specific to a TripGroup
    socket.on("group:join", (groupId: string) => {
      if (groupId) {
        socket.join(groupId);
        console.log(`Socket ${socket.id} joined TripGroup room ${groupId}`);
        socket.emit("group:joined", { groupId });
      }
    });

    socket.on("disconnect", () => {
      console.log("Real-time collaboration: client disconnected, socket id =", socket.id);
    });
  });
};
