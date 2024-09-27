const express = require("express");

const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.get("/", expenseController.getExpense);

router.post("/", expenseController.postExpense);

router.delete("/:expenseId", expenseController.deleteExpense);

module.exports = router;
