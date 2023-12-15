const userModel = require("../models/user.model");

const addFriend = async (req, res) => {
  const { userID, friendID } = req.params;

  try {
    const user = await userModel.findById(userID);
    const friend = await userModel.findById(friendID);

    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();
      return res.status(200).json({ message: "Ami ajouté avec succès" });
    } else {
      return res
        .status(400)
        .json({ message: "Cet utilisateur est déjà dans la liste d'amis" });
    }
  } catch (err) {
    console.error(err);
  }
};

const getFriend = async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await userModel.findById(userID).populate("friends").exec();
    return res.status(200).json(user.friends);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { addFriend, getFriend };
