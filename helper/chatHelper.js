const discussionModel = require("./../models/discussions.model");

const addDiscussion = async (userID, friendID) => {
  const user = await userModel.findById(userID);
  const friend = await userModel.findById(friendID);
  let userArray = [{ userID }, { friendID }];

  if (user.friends.includes(friend._id)) {
    let newDiscussion = new discussionModel({
      users: userArray,
    });

    return newDiscussion.save();
  }
};
