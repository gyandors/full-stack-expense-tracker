const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.postUserSignup);

router.post("/signin", userController.postUserSignin);

module.exports = router;
