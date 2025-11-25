const User = require("../models/userModel");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "totalExpenses"],
      order: [["totalExpenses", "DESC"]],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
