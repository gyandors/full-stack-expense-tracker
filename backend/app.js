const express = require("express");
const cors = require("cors");

const sequelize = require("./utils/sequelize");
const userRoute = require("./routes/userRoute");

const app = express();
const port = 4000;

app.use(cors());

app.use(express.json());

app.use("/user", userRoute);

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
