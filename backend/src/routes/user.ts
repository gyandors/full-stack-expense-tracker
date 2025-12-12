import { Router } from "express";

import {
  postUserSignin,
  postUserSignup,
  getUserData,
} from "../controllers/user";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post("/signup", postUserSignup);

router.post("/signin", postUserSignin);

router.get("/data", authenticate, getUserData);

export default router;
