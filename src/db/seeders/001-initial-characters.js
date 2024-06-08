'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const characters = [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: "Earth (C-137)",
        location: "Earth (Replacement Dimension)",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/2"],
        url: "https://rickandmortyapi.com/api/character/1",
        created: "2017-11-04T18:48:46.250Z"
      },
      // Agrega otros 14 registros aquí...
    ];

    await queryInterface.bulkInsert('characters', characters, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('characters', null, {});
  }
};
