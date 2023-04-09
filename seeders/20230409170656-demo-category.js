'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Instruments",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Guitars",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: "Keys",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: "String instruments",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: "Accessories",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sheet music",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
