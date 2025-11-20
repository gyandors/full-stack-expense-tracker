const { DataTypes } = require("sequelize");

const sequelize = require("../utils/sequelize");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPremiumUser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
