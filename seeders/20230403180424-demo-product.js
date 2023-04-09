'use strict';

const myProducts = [
  {
    name: "Electric guitar",
    price: 165,
    description: "Top class instrument for professional use",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  {
    name: "Acoustic guitar",
    price: 110,
    description: "Steel strings, affordable alternative for beginners or intermediate players. Laminated maple",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Electric bass",
    price: 180,
    description: "High performance and durable for amateurs and professionals alike.",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Violin",
    price: 430,
    description: "Top class instrument for professional use. Includes bow and case",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Ukulele",
    price: 45,
    description: "Attractive and durable with a glossy varnish",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
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
    name: "Classical composers for dummies",
    price: 60,
    description: "The Bible of sonatas, a must-have for any classical musician.",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: "Guitar picks",
    price: 14.99,
    description: "A pack of 15 lightweight and colourful guitar picks without logos",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Microphone",
    price: 50,
    description: "High quality microphone with crystal clear sound",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Amplifier",
    price: 109,
    description: "Electric guitar amplifier, ideal for both practising and small performances ",
    image: "myimage.png",
    createdAt: new Date(),
    updatedAt: new Date()
  }
 
]

/** @type {import('sequelize-cli').Migration} */

module.exports = { 
  
  async up (queryInterface, Sequelize) { 
    //THIS ADDS 5 PRODUCTS, but Category association must be created separately 

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
