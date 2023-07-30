'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from: {
        type: Sequelize.INTEGER,
        references:{model: 'Users', key: 'id'}
      },
      to: {
        type: Sequelize.INTEGER,
        references:{model: 'Users', key: 'id'}
      },
      content: {
        type: Sequelize.STRING
      },
      idConversation: {
        type: Sequelize.INTEGER,
        references:{model: 'Conversations', key: 'id'}
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};