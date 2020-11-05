'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: 'Joe Hovanec',
          userName: 'jhovanec',
          email: 'jhovanec@gmail.com',
          address: '123 Main st',
          createdAt: new Date(),
          updatedAt: new Date(),
          groupid: 1,
          password: '1201',
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
