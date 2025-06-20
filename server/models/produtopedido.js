export default (sequelize, DataTypes) => {
    const ProdutoPedido = sequelize.define('ProdutoPedido', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_pedido: { type: DataTypes.INTEGER, allowNull: false },
        id_produto: { type: DataTypes.INTEGER, allowNull: false },
        quantidade: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        valor_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        valor_total: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    }, {
        tableName: 'produtos_pedido'
    });

    return ProdutoPedido;
};
