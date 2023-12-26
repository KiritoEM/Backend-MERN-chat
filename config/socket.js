const chatModel = require("./../models/chat.model");
const discussionModel = require("./../models/discussions.model");

const setupSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("messages", async (messages) => {
      console.log("messages depuis react", messages);
      const populatedMessage = await populateAuthor(messages);
      io.emit("messages", populatedMessage);
    });

    socket.on("discussions", async (discussions) => {
      console.log("discussions instantannées", discussions);
      io.emit("discussions", discussions);
    });

    socket.on("newDiscussion", async (discussion) => {
      console.log("nouvelle discussion", discussion);
      io.emit("newDiscussion", discussion);
    });
  });

  return io;
};

const populateAuthor = async (message) => {
  const populatedMessage = await chatModel
    .findById(message._id)
    .populate("author");
  return populatedMessage;
};

module.exports = setupSocket;
