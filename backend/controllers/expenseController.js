const User = require("../models/userModel");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getExpense = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const expenses = await user.getExpenses();

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.postAddExpense = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const { amount, description, category } = req.body;
    const expense = await user.createExpense({
      amount,
      description,
      category,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
