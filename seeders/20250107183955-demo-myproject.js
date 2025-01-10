"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Myprojects", [
      {
        projectname: "Smart Door Lock",
        startdate: "2020-03-14",
        enddate: "2025-03-14",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        technologiesA: "http://localhost:2002/assets/img/node.png",
        technologiesB: "http://localhost:2002/assets/img/react.png",
        technologiesC: "http://localhost:2002/assets/img/next.png",
        technologiesD: "http://localhost:2002/assets/img/typescript.png",
        image:
          "http://localhost:2002/assets/img/wp12976537-obito-uchiha-pc-wallpapers.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Myprojects", null, {});
  },
};
