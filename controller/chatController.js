const discussionModel = require("./../models/discussions.model");
const chatModel = require("./../models/chat.model");
const { addDiscussion, makeChat } = require("./../helper/chatHelper");
const socketIoClient = require("socket.io-client");

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

    const socket = socketIoClient(process.env.URL_LOCALHOST);
    socket.emit("discussions", filteredDiscussion);

    return res.status(200).json(filteredDiscussion);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getChat = async (req, res) => {
  const { discussionID } = req.params;

  try {
    const chat = await chatModel
      .find({ discussion_ref: discussionID })
      .populate("discussion_ref")
      .populate("author")
      .exec();

    return res.status(200).json(chat);
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
      const updatedDiscussion = await discussionModel
        .findById(discussionID)
        .populate({
          path: "users",
          match: { _id: { $ne: userID } },
        })
        .populate("messages")
        .exec();

      const socket = socketIoClient(process.env.URL_LOCALHOST);
      socket.emit("discussions", [updatedDiscussion]);
      socket.emit("messages", response);
      res.status(200).json({ message: "message ajouté avec succés", response });
    } else {
      res.status(500).json("echec de l' envoi du message");
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { newDiscussion, newChat, getDiscussions, getChat };
