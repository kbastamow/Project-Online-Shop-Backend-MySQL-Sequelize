'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Review,{ onDelete: "cascade" }),  //Added cascade here, let's see if it works
      Product.belongsToMany(models.Order, { through: models.Order_Product }), //This one was created manually
      Product.belongsToMany(models.Category, { through: models.Category_Product })// Automatic creation -didn't work
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};