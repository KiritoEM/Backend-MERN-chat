const userModel = require("../models/user.model");

const getAllUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await userModel.find({ _id: { $ne: userID } });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUser };
