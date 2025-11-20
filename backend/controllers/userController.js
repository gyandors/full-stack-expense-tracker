const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.postUserSignup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (
      firstName.trim().length < 1 ||
      lastName.trim().length < 1 ||
      email.trim().length < 1 ||
      password.trim().length < 1
    ) {
      const error = new Error("Enter the required details.");
      error.code = 400;
      throw error;
    } else if (!email.includes("@") || email.trim().length < 6) {
      const error = new Error("Invalid email address.");
      error.code = 400;
      throw error;
    } else if (password.trim().length < 6) {
      const error = new Error("Password should be minimum six characters.");
      error.code = 400;
      throw error;
    }

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      const error = new Error("Email already exists.");
      error.code = 409;
      throw error;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });

    //Creating jwt token and deleting some properties before sending the response.
    delete user.dataValues.password;
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;
    user.dataValues.idToken = jwt.sign(
      { id: user.dataValues.id },
      "PrivateKey"
    );

    res.status(201).json(user);
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
exports.postUserSignin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (email.trim().length < 1 || password.trim().length < 1) {
      const error = new Error("Enter the required details.");
      error.code = 400;
      throw error;
    }

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      const encryptedPassword = existingUser.dataValues.password;
      const decryptedPassword = await bcrypt.compare(
        password,
        encryptedPassword
      );
      if (decryptedPassword) {
        //Creating jwt token and deleting some properties before sending the response.
        delete existingUser.dataValues.password;
        delete existingUser.dataValues.createdAt;
        delete existingUser.dataValues.updatedAt;
        existingUser.dataValues.idToken = jwt.sign(
          { id: existingUser.dataValues.id },
          "PrivateKey"
        );

        res.status(200).json(existingUser);
      } else {
        const error = new Error("User not authorized.");
        error.code = 401;
        throw error;
      }
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
exports.getUserData = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
