const discussionModel = require("./../models/discussions.model");
const userModel = require("../models/user.model");

const addDiscussion = async (userID, friendID) => {
  const user = await userModel.findById(userID);
  const friend = await userModel.findById(friendID);

  if (user.friends.includes(friend._id)) {
    const existingDiscussion = await discussionModel.findOne({
      users: { $all: [user._id, friend._id] },
    });

    if (existingDiscussion) {
      console.log("Discussion already exists.");
      return existingDiscussion;
    }

    let newDiscussion = new discussionModel({
      users: [user._id, friend._id],
    });

    return newDiscussion.save();
  } else {
    console.log("Friend is not in the user's friend list.");
    throw new Error("Friend is not in the user's friend list.");
  }
};

module.exports = { addDiscussion };
