const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: string,
    resuired: true,
  },
});

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;
