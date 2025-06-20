export default (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    valor_total_pedido: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    qtd_items: { type: DataTypes.INTEGER, allowNull: false },
    data_pedido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    endereco: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'pedidos'
  });

  Pedido.associate = models => {
    Pedido.belongsToMany(models.Produto, {
      through: models.ProdutoPedido,
      foreignKey: 'id_pedido',
      otherKey: 'id_produto'
    });
  };

  return Pedido;
};
