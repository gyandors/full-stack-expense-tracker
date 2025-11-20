const express = require("express");

const {
  postPurchasePremium,
  PostUpdateTransactionStatus,
} = require("../controllers/purchaseController");

const router = express.Router();

router.post("/premium", postPurchasePremium);

router.post("/updateTransactionStatus", PostUpdateTransactionStatus);

module.exports = router;
