const userModel = require("../models/user.model");

const getUserHelper = async (userID) => {
  const userInfo = await userModel.findById(userID);
  const friendIDs = await userInfo.friends.map((friend) => friend._id);
  const user = await userModel.find({
    _id: { $ne: userID, $nin: friendIDs },
  });
  return user;
};

module.exports = { getUserHelper };
