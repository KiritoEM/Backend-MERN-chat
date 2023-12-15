const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "nouvelle-discussion",
  },
  //liste des utilisateurs dans la discussion
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // liste des messages dans la discussion
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
    },
  ],
});

const discussionModel = mongoose.model("Discussion", discussionSchema);
module.exports = discussionModel;
