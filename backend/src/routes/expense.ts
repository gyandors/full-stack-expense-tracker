import { Router } from "express";

import { deleteExpense, getExpense, postExpense } from "../controllers/expense";

const router = Router();

router.get("/", getExpense);

router.post("/", postExpense);

router.delete("/:expenseId", deleteExpense);

export default router;
