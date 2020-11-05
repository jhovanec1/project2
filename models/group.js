'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.User, { foreignKey: 'groupid'});
      Group.hasOne(models.Groupaccount, {foreignKey: 'groupid'})
    }
  };
  Group.init({
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    groupid: DataTypes.INTEGER,
    members: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};