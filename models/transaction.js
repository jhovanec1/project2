'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.UserAccount, {foreignKey: 'userid'});
      Transaction.belongsTo(models.Groupaccount, {foreignKey: 'groupid'})
    }
  };
  Transaction.init({
    userid: DataTypes.INTEGER,
    groupid: DataTypes.INTEGER,
    stockid: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};