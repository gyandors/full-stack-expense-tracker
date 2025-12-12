import { Router } from "express";

import { getLeaderboard } from "../controllers/leaderboard";
import { isPremiumUser } from "../middlewares/auth";

const router = Router();

router.get("/", isPremiumUser, getLeaderboard);

export default router;
