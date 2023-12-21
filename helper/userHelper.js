const userModel = require("../models/user.model");
const { verifyToken } = require("./../helper/tokenHelper");

const getUserHelper = async (userID) => {
  const userInfo = await userModel.findById(userID);
  const friendIDs = userInfo.friends.map((friend) => friend._id);
  const user = await userModel.find({
    _id: { $ne: userID, $nin: friendIDs },
  });
  return user;
};

const fectchUserHelper = async (token) => {
  let userID;
  let decodedToken = verifyToken(token);
  if (decodedToken.userId) {
    userID = decodedToken.userId;
  }
  const user = await userModel.findById(userID);

  return user;
};

module.exports = { getUserHelper, fectchUserHelper };
