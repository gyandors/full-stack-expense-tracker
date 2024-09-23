const User = require("../models/userModel");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.postUserSignup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email.includes("@") || email.trim().length < 6) {
      const error = new Error("Invalid email address.");
      error.code = 400;
      throw error;
    }

    if (password.trim().length < 6) {
      const error = new Error("Password should be minimum six characters.");
      error.code = 400;
      throw error;
    }

    const existingUser = await User.findAll({ where: { email: email } });
    if (existingUser[0]) {
      const error = new Error("Email already exists.");
      error.code = 409;
      throw error;
    }

    const user = await User.create({ firstName, lastName, email, password });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
