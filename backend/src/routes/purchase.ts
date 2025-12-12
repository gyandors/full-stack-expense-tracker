import { Router } from "express";

import {
  postPurchasePremium,
  postUpdateTransactionStatus,
} from "../controllers/purchase";

const router = Router();

router.post("/premium", postPurchasePremium);

router.post("/updateTransactionStatus", postUpdateTransactionStatus);

export default router;
