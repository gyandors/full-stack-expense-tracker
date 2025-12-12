import { Request, Response } from "express";
import User from "../models/user";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "totalExpenses"],
      order: [["totalExpenses", "DESC"]],
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
