const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const GoldPrice = sequelize.define("GoldPrice", {
  id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true
  },
  date:           { type: DataTypes.DATE,   allowNull: false },
  price_per_gram: { type: DataTypes.FLOAT,  allowNull: false },
  price_per_10g:  { type: DataTypes.FLOAT,  allowNull: false },
  usd_price:      { type: DataTypes.FLOAT },
  usd_inr_rate:   { type: DataTypes.FLOAT },
  avg_7_days:     { type: DataTypes.FLOAT },
  correction_factor: { type: DataTypes.FLOAT, defaultValue: 1.0 },
  source:         { type: DataTypes.STRING, defaultValue: "live" }
}, {
  tableName:  "gold_prices",
  timestamps: true
});

module.exports = GoldPrice;