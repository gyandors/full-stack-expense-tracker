const User = require("../models/userModel");
const Expense = require("../models/expenseModel");
const sequelize = require("../utils/sequelize");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getLeaderboard = async (req, res, next) => {
  try {
    const usersWithExpenses = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        [
          sequelize.fn("sum", sequelize.col("expenses.amount")),
          "totalExpenses",
        ],
      ],
      include: [{ model: Expense, attributes: [] }],
      group: ["users.id"],
      order: [["totalExpenses", "DESC"]],
    });

    res.status(200).json(usersWithExpenses);
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
