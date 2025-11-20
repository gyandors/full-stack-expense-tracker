const express = require("express");

const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", userController.postUserSignup);

router.post("/signin", userController.postUserSignin);

router.get("/data", auth.authenticate, userController.getUserData);

module.exports = router;
