const express = require("express");
const router = express.Router();
const { addFriend, getFriend } = require("../controller/FriendController");
const { newDiscussion } = require("./../controller/chatController");

//routes pour l' ajout d' amis
router.post("/:userID/addFriend/:friendID", addFriend);
router.get("/:userID", getFriend);

//route pour la creation de discussion
router.post("/:userID/new-discussion/:friendID", newDiscussion);

module.exports = router;
