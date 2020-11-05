'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert(
     "Groups",
     [
       {
         name: "One",
         balance: 1000,
         groupid: 1,
         members: 10,
       },
       {
        name: "Two",
        balance: 1000,
        groupid: 2,
        members: 10,
       },
       {
        name: "Three",
        balance: 1000,
        groupid: 3,
        members: 10,
       }
     ],
     {}
   );
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
