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
    type: String,
    resuired: true,
  },
  discussion_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discussion",
  },
});

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;
