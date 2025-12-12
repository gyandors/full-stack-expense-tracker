import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user";
import HttpError from "../utils/HttpError";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = jwt.verify(req.headers.authorization!, "PrivateKey");

    const { id } = decoded as { id: string };

    const user = await User.findOne({ where: { id: id } });

    if (user) {
      req.user = user;
      next();
    } else {
      throw new HttpError("User does not exist.", 404);
    }
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

export const isPremiumUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.isPremiumUser) {
      next();
    } else {
      throw new HttpError("Access denied. Premium membership required.", 403);
    }
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
