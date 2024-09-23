const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "expense-tracker",
  username: "root",
  password: "root",
  timezone: "+05:30",
});

module.exports = sequelize;
