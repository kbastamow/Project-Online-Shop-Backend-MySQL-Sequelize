'use strict';

const myProducts = [
  {
    name: "Violin",
    price: 430,
    description: "Top class instrument for professional use",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Love songs from the 80s",
    price: 25,
    description: "25 pages of sheet music for guitar and piano",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: "Recorder",
    price: 88,
    description: "For your child's first steps into music lessons. Plastic.",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Classical composers for dummies",
    price: 60,
    description: "The Bible of sonatas",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: "Ukulele B450",
    price: 150,
    description: "Latest technology",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */

module.exports = { 
  
  async up (queryInterface, Sequelize) { 
    //THIS ADDS 5 PRODUCTS, but Category association will be empty 

    return queryInterface.bulkInsert("Products", myProducts);
  },

       /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
 

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
     await queryInterface.bulkDelete("Products", null, {});
     
  }
};
