const socketIO = require("socket.io");

const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Nouvelle connexion socket");

    socket.on("message", (data) => {
      console.log("Message reçu:", data);
      io.emit("message", data);
    });
  });

  return io;
};

module.exports = setupSocket;
