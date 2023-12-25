const setupSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("messages", (messages) => {
      console.log("messages depuis react" , messages);
      io.emit("messages", messages);
    });
  });

  return io;
};

module.exports = setupSocket;
