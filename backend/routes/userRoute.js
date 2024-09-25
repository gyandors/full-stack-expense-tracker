const express = require("express");

const userController = require("../controllers/userController");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.post("/signup", userController.postUserSignup);

router.post("/signin", userController.postUserSignin);

router.get("/:userId/expense", expenseController.getExpense);

router.post("/:userId/add-expense", expenseController.postAddExpense);

module.exports = router;
