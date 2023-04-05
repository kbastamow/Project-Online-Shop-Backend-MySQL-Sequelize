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
      Product.belongsToMany(models.Order, { through: models.Order_Product }), 
      Product.belongsToMany(models.Category, { 
        through: models.Category_Product,
        onDelete: 'CASCADE' //THIS DOES NOT WORK!
       })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product name is required"
        },
       
      }
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is required."
        },
        isDecimal: {
          msg:"Provide valid price"
        }
     }
    } ,

    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};