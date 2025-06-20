'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('produtos_pedidos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    id_pedido: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'pedidos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    id_produto: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'produtos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    valor_unitario: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    valor_total: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('produtos_pedidos');
}
