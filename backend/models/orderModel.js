const sequelize = require("../utils/sequelize");
const { DataTypes } = require("sequelize");

const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.STRING,
  },
});

module.exports = Order;
