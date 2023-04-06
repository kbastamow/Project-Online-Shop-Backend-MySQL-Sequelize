'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User),
      Review.belongsTo(models.Product)
    }
  }
  Review.init({
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please rate the product (0-5)"
        },
        max: {
          args: [5],
          msg: "Enter a value between 0 and 5"
        },
        min: {
          args: [0],
          msg: "Enter a value between 0 and 5"
        }
      }
    },

    details: DataTypes.STRING,

    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Enter a valid product id."
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });

  return Review;
};