'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Review, { onDelete: "cascade" }), //Added these to specify relationship
      User.hasMany(models.Order, { onDelete: "cascade" }),
      User.hasMany(models.Token)
    }
  }
  User.init({
    email: { 
      type: DataTypes.STRING,
      allowNull: false,   //added in migration but must add here too or validations won't work
      validate: {
        notNull: {    
          msg: "Email is required."
        },
        isEmail: { //Built-in Sequelize validation 
          msg: "Email not valid"
        }
      }
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required."
        }
      }
    },

    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Surname is required."
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        }
      }
    },


    role: DataTypes.STRING


  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};