'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Order_Products", [
      {
        quantity: 1,
        OrderId: 1,
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 2,
        OrderId: 2,
        ProductId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 1,
        OrderId: 3,
        ProductId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 1,
        OrderId: 4,
        ProductId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        quantity: 1,
        OrderId: 4,
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
