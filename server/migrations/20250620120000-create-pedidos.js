'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('pedidos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    valor_total_pedido: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    qtd_items: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    data_pedido: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    endereco: {
      type: Sequelize.STRING,
      allowNull: true
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
}

export async function down(queryInterface) {
  await queryInterface.dropTable('pedidos');
}
