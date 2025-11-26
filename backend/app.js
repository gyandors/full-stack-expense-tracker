require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");

const sequelize = require("./utils/sequelize");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const purchaseRoute = require("./routes/purchaseRoute");
const leaderboardRoute = require("./routes/leaderboardRoute");
const User = require("./models/userModel");
const Expense = require("./models/expenseModel");
const Order = require("./models/orderModel");
const auth = require("./middlewares/auth");

const app = express();

const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });

app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);

app.use("/api/expense", auth.authenticate, expenseRoute);

app.use("/api/purchase", auth.authenticate, purchaseRoute);

app.use("/api/leaderboard", auth.authenticate, leaderboardRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    return sequelize.sync();
    return sequelize.sync({ force: true });
  })
  .then(() =>
    app.listen(process.env.PORT || 4000, () =>
      console.log("Server listening on port", process.env.PORT || 4000)
    )
  )
  .catch((err) => console.error("Unable to connect to the database:", err));
