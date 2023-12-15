const discussionModel = require("./../models/discussions.model");
const chatModel = require("./../models/chat.model");
const userModel = require("../models/user.model");

const addDiscussion = async (userID, friendID, name) => {
  const user = await userModel.findById(userID);
  const friend = await userModel.findById(friendID);

  if (user.friends.includes(friend._id)) {
    const existingDiscussion = await discussionModel.findOne({
      users: { $all: [user._id, friend._id] },
    });

    if (existingDiscussion) {
      console.log("Discussion already exists.");
    } else {
      let newDiscussion = new discussionModel({
        users: [user._id, friend._id],
        name: name,
      });

      const savedDiscussion = await newDiscussion.save();

      user.discussions.push(savedDiscussion._id);

      await user.save();

      console.log("Discussion créée avec succès.");
      return savedDiscussion;
    }
  } else {
    console.log("Friend is not in the user's friend list.");
    throw new Error("Friend is not in the user's friend list.");
  }
};

const makeChat = async (content, userID, discussionID) => {
  const discussion = await discussionModel.findById(discussionID);

  const newChat = new chatModel({
    content: content,
    author: userID,
    discussion_ref: discussionID,
  });

  const savedChat = await newChat.save();

  discussion.messages.push(savedChat._id);

  await discussion.save();

  return savedChat;
};

module.exports = { addDiscussion, makeChat };
