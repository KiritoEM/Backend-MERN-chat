const setupSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Utilisateur connecté");

    socket.on("message", (data) => {
      console.log("Message reçu:", data);
      io.emit("message", data);
    });
  });

  return io;
};

module.exports = setupSocket;
