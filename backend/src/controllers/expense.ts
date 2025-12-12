import { Request, Response } from "express";

export const getExpense = async (req: Request, res: Response) => {
  try {
    const expenses = await req.user.getExpenses();

    res.status(200).json(expenses);
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

export const postExpense = async (req: Request, res: Response) => {
  const { amount, description, category } = req.body;
  try {
    const expense = await req.user.createExpense({
      amount,
      description,
      category,
    });

    await req.user.increment("totalExpenses", { by: amount });

    res.status(201).json(expense);
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const expenses = await req.user.getExpenses({
      where: { id: req.params.expenseId },
    });

    await req.user.decrement("totalExpenses", { by: expenses[0].amount });

    await expenses[0].destroy();

    res.status(200).json("Expense has been deleted");
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
