const express = require("express");
const router = express.Router();
const { addFriend, getFriend } = require("../controller/FriendController");
const { newDiscussion, newChat } = require("./../controller/chatController");
const { getAllUser , fetchCurrentUser } = require("./../controller/userController");

//route pour avoir tous les users
router.get("/all-user/:token", getAllUser);

//routes pour l' ajout d' amis
router.post("/:userID/addFriend/:friendID", addFriend);
router.get("/:userID", getFriend);

//route pour la creation de discussion
router.post("/:userID/new-discussion/:friendID", newDiscussion);

//route pour la creation de  message
router.post("/:userID/new-message/:discussionID", newChat);

//route pour récupérer l'utilisateur actuel
router.get("/fetch-current-user/:token", fetchCurrentUser);

module.exports = router;
