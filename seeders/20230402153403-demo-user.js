'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( "Users", [
      {
      email: "vincent@example.com",
      name: "Vincent",
      surname: "Van Gogh",
      password: "1234",
      role:"admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    email: "frida@example.com",
    name: "Frida",
    surname: "Kahlo",
    password: "1234",
    role:"superAdmin",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
  email: "claude@example.com",
  name: "Claude",
  surname: "Monet",
  password: "1234",
  role:"user",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  email: "mary@example.com",
  name: "Mary",
  surname: "Shelley",
  password: "1234",
  role:"user",
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
