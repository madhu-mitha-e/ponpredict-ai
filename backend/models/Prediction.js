const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Prediction = sequelize.define("Prediction", {
  id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true
  },
  date: {
    type:      DataTypes.DATE,
    allowNull: false
  },
  predicted_price: {
    type:      DataTypes.FLOAT,
    allowNull: false
  },
  price_per_10g: {
    type: DataTypes.FLOAT
  },
  actual_price: {
    type: DataTypes.FLOAT
  },
  prediction_error: {
    type: DataTypes.FLOAT
  },
  correction_factor: {
    type:         DataTypes.FLOAT,
    defaultValue: 0.96
  },
  type: {
    type:         DataTypes.ENUM("tomorrow", "7day"),
    defaultValue: "7day"
  },
  accuracy: {
    type: DataTypes.FLOAT
  }
}, {
  tableName:  "predictions",
  timestamps: true
});

module.exports = Prediction;