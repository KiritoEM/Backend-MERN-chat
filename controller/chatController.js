const userModel = require("../models/user.model");
const { addDiscussion } = require("./../helper/chatHelper");

const newDiscussion = async (req, res) => {
  const { userID, friendID } = req.params;
  const { name } = req.body;

  try {
    const response = await addDiscussion(userID, friendID, name);

    if (response) {
      res
        .status(200)
        .json({ message: "discussion ajoutée avec succés", response });
    } else {
      res.status(500).json("echec de la creation de la discussion");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { newDiscussion };
