const express = require("express");
const cors = require("cors");

const sequelize = require("./utils/sequelize");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const User = require("./models/userModel");
const Expense = require("./models/expenseModel");
const auth = require("./middlewares/auth");

const app = express();
const port = 4000;

app.use(cors());

app.use(express.json());

app.use("/api/user", userRoute);

app.use("/api/expense", auth.authenticate, expenseRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    return sequelize.sync();
    return sequelize.sync({ force: true });
  })
  .then(() =>
    app.listen(port, () => console.log("Server listening on port", port))
  )
  .catch((err) => console.error("Unable to connect to the database:", err));
