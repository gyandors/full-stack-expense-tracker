import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import sequelize from "./utils/sequelize";

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
