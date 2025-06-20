export default (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        descricao: { type: DataTypes.STRING },
        imagem: { type: DataTypes.STRING },
        preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    }, {
        tableName: 'produtos'
    });

    Produto.associate = models => {
        Produto.belongsToMany(models.Pedido, {
            through: models.ProdutoPedido,
            foreignKey: 'id_produto',
            otherKey: 'id_pedido'
        });
    };

    return Produto;
};
