bcrypt = require("bcryptjs");



'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( "Users", [
      {
      email: "testadmin@example.co",
      name: "Andy",
      surname: "Administrator",
      password: bcrypt.hashSync("1234", 10), 
      role:"admin",
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    email: "test_superadmin@example.co",
    name: "Sarah",
    surname: "Superadmin",
    password: bcrypt.hashSync("1234", 10),
    role:"superadmin",
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
},
{
  email: "testuser@example.co",
  name: "Tony",
  surname: "Tester",
  password: bcrypt.hashSync("1234", 10),
  role:"user",
  confirmed: true,
  confirmed: true,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  email: "testuser_two@example.tes",
  name: "Jill",
  surname: "Jester",
  password: bcrypt.hashSync("1234", 10),
  role:"user",
  confirmed: true,
  createdAt: new Date(),
  updatedAt: new Date()
},
  {
  email: "testuser_three@example.tes",
  name: "Fred",
  surname: "Fester",
  password: bcrypt.hashSync("1234", 10),
  role:"user",
  confirmed: true,
  createdAt: new Date(),
  updatedAt: new Date()
},

{
  email: "testuser_four@example.tes",
  name: "Bob",
  surname: "Bester",
  password: bcrypt.hashSync("1234", 10),
  role:"user",
  confirmed: true,
  createdAt: new Date(),
  updatedAt: new Date()
},

  ])
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
