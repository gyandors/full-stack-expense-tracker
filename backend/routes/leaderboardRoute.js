const express = require("express");

const { getLeaderboard } = require("../controllers/leaderboardController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth.isPremiumUser, getLeaderboard);

module.exports = router;
