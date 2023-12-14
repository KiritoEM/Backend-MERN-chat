const express = require("express");
const router = express.Router();
const { addFriend, getFriend } = require("../controller/FriendController");

router.post("/:userID/addFriend/:friendID", addFriend);
router.get("/:userID", getFriend);

module.exports = router;
