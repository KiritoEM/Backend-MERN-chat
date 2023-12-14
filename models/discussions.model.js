const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  //liste des discussions de chaque utilisateur
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // liste des messages dans la discussion
  messages : [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
    },
  ],
});

const discussionModel = mongoose.model("Discussion", discussionSchema);
module.exports = discussionModel;
