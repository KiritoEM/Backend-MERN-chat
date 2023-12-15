const userModel = require("../models/user.model");
const { addDiscussion } = require("./../helper/chatHelper");

const newDiscussion = async (req, res) => {
  const { userID, friendID } = req.params;

  try {
    const response = await addDiscussion(userID, friendID);

    if (response) {
      res
        .status(200)
        .json({ message: "discussion ajoutée avec succés", response });
    
      
    } else {
      res.status(500).json("echec de la creation de la discussion");
    }
  } catch (err) {}
};

module.exports = { newDiscussion };
