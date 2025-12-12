import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";
import HttpError from "../utils/HttpError";

export const postUserSignup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (
      firstName.trim().length < 1 ||
      lastName.trim().length < 1 ||
      email.trim().length < 1 ||
      password.trim().length < 1
    ) {
      throw new HttpError("Enter the required details.", 400);
    } else if (!email.includes("@") || email.trim().length < 6) {
      throw new HttpError("Invalid email address.", 400);
    } else if (password.trim().length < 6) {
      throw new HttpError("Password should be minimum six characters.", 400);
    }

    const existingUser = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    if (existingUser) throw new HttpError("Email already exists.", 409);

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });

    user.dataValues.idToken = jwt.sign(
      { id: user.dataValues.id },
      "PrivateKey"
    );

    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

export const postUserSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (email.trim().length < 1 || password.trim().length < 1) {
      throw new HttpError("Enter the required details.", 400);
    }

    const existingUser = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    if (existingUser) {
      const encryptedPassword = existingUser.dataValues.password;
      const decryptedPassword = await bcrypt.compare(
        password,
        encryptedPassword
      );
      if (decryptedPassword) {
        existingUser.dataValues.idToken = jwt.sign(
          { id: existingUser.dataValues.id },
          "PrivateKey"
        );

        res.status(200).json(existingUser);
      } else {
        throw new HttpError("User not authorized.", 401);
      }
    } else {
      throw new HttpError("User does not exist.", 404);
    }
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    res.status(200).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
