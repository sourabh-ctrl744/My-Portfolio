'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      subject: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add index on email for faster lookups
    await queryInterface.addIndex('Messages', ['email'], {
      name: 'messages_email_idx'
    });

    // Add index on read status
    await queryInterface.addIndex('Messages', ['read'], {
      name: 'messages_read_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};

