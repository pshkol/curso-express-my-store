'use strict';

const {TABLE_NAME, CustomerSchema} = require('../models/customer.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, CustomerSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
