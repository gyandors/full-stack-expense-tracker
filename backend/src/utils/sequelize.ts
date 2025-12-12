import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "expense-tracker",
  username: "root",
  password: "root",
  timezone: "+05:30",
  logging: false,
});

export default sequelize;
