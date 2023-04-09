'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Category_Products", [
      {
        CategoryId: 1,
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 4,
        ProductId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 1,
        ProductId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 4,
        ProductId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 6,
        ProductId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 6,
        ProductId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 2,
        ProductId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 5,
        ProductId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 5,
        ProductId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CategoryId: 5,
        ProductId: 10,
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
