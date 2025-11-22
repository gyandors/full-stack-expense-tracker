const User = require("../models/userModel");
const Expense = require("../models/expenseModel");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.findAll();

    const usersWithExpenses = await Promise.all(
      users.map(async (user) => {
        const totalExpenses = await Expense.sum("amount", {
          where: { userId: user.id },
        });
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          totalExpenses: totalExpenses || 0,
        };
      })
    );

    usersWithExpenses.sort((a, b) => b.totalExpenses - a.totalExpenses);
    res.status(200).json(usersWithExpenses);
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
