'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groupaccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Groupaccount.belongsTo(models.Group, {foreignKey: 'groupid'});
      Groupaccount.hasMany(models.Transaction, {foreignKey: 'groupid'});
    }
  };
  Groupaccount.init({
    name: DataTypes.STRING,
    members: DataTypes.INTEGER,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Groupaccount',
  });
  return Groupaccount;
};