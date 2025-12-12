import express from "express";
import fs from "fs";
import morgan from "morgan";
import cors from "cors";

import userRoute from "./routes/user";
import expenseRoute from "./routes/expense";
import purchaseRoute from "./routes/purchase";
import leaderboardRoute from "./routes/leaderboard";

import User from "./models/user";
import Expense from "./models/expense";
import Order from "./models/order";
import { authenticate } from "./middlewares/auth";

const app = express();

const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });

app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);

app.use("/api/expense", authenticate, expenseRoute);

app.use("/api/purchase", authenticate, purchaseRoute);

app.use("/api/leaderboard", authenticate, leaderboardRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

export default app;
