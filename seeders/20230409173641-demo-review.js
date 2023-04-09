'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Reviews", [
      {
        stars: 5,
        details: "Great value for money with fine sound and elegant look.",
        UserId: 3,
        ProductId: 1,
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stars: 4,
        details: "Just what I was looking for.",
        UserId: 4,
        ProductId: 6,
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stars: 5,
        details: "Very happy with my purchase.",
        UserId: 5,
        ProductId: 5,
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stars: 2,
        details: "The sound could be better. I wouldn't use in concerts.",
        UserId: 6,
        ProductId: 1,
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        stars: 4,
        details: "Good enough for small settings.",
        UserId: 6,
        ProductId: 10,
        approved: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
