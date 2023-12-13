const mongoose = require("mongoose");

const userSchema = new userSchema({
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
  discussion_list: {
    type: Array,
    default: [],
  },
  friends: {
    type: Array,
    default: [],
  },
});
