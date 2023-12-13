const express = require("express");
const router = express.Router();
const {
  signupController
} = require("../controller/AuthController");

//route signup
router.post("/signup", signupController);

// //route login
// router.post("/login", loginController);

module.exports = router;
