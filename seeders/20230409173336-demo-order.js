'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Orders", [
      {
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        UserId: 5,
        createdAt: new Date(),
        updatedAt: new Date()

      },

      {
        UserId: 6,
        createdAt: new Date(),
        updatedAt: new Date()

      }


  ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
