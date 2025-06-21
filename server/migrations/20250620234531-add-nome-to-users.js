'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Users', 'nome', {
    type: Sequelize.STRING,
    allowNull: false,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Users', 'nome');
}
