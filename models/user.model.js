const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, //regex generate
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  dateCreation: {
    type: Date,
    default: Date.now,
  },

  //liste des discussions de chaque utilisateur
  discussions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
    },
  ],

  // liste d'amis
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
