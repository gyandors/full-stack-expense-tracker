const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.authenticate = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.headers.authorization, "PrivateKey");
    const user = await User.findOne({ where: { id: id } });

    if (user) {
      req.user = user;
      next();
    } else {
      const error = new Error("User does not exist.");
      error.code = 404;
      throw error;
    }
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
exports.isPremiumUser = async (req, res, next) => {
  try {
    if (req.user.isPremiumUser) {
      next();
    } else {
      const error = new Error("Access denied. Premium membership required.");
      error.code = 403;
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
