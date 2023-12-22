const discussionModel = require("./../models/discussions.model");
const { addDiscussion, makeChat } = require("./../helper/chatHelper");

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

const getDiscussions = async (req, res) => {
  const { userID } = req.params;

  try {
    const discussion = await discussionModel
    .find({ users: userID })
    .populate({
      path: "users",
      match: { _id: { $ne: userID } },
    })
    .populate("messages")
    .exec();
  
  const filteredDiscussion = discussion.filter((d) => d.users.length > 0);
  
  return res.status(200).json(filteredDiscussion);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const newChat = async (req, res) => {
  const { userID, discussionID } = req.params;
  const { content } = req.body;

  try {
    const response = await makeChat(content, userID, discussionID);

    if (response) {
      res.status(200).json({ message: "message ajouté avec succés", response });
    } else {
      res.status(500).json("echec de l' envoi du message");
    }
  } catch (err) {}
};

module.exports = { newDiscussion, newChat, getDiscussions };
