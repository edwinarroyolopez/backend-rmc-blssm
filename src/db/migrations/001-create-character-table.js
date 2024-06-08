'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('characters', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING
      },
      species: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      origin: {
        type:  Sequelize.JSONB,
        allowNull: true
      },
      location: {
        type:  Sequelize.JSONB,
        allowNull: true
      },
      image: {
        type: Sequelize.STRING
      },
      episode: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      url: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.STRING
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('characters');
  }
};
