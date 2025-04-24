import connection from "../db/connection.js";

export default {
  async index(req, res) {
    const [pedidos] = await connection.query("select * from pedidos p join produtos_pedido pp on pp.id_pedido = p.id join produtos pr on pr.id = pp.id_produto");
    const id = pedidos[0];
    res.json({ id, pedidos });
  },

  

  async findOne(req, res) {
    const { id } = req.params;
    const [pedido] = await connection.query("SELECT * FROM pedidos WHERE id = ?", [id]);

    if (!pedido.length) {
      return res.status(404).send("Pedido não encontrado");
    }

    const [produtos] = await connection.query(
      "SELECT * FROM produtos_pedidos WHERE id_pedido = ?",
      [id]
    );

    res.json({ ...pedido[0], produtos });
  },

  async create(req, res) {
    const { qtd_items, endereco, produtos } = req.body;

    try {
      const valor_total_pedido = produtos.reduce(
        (acc, p) => acc + p.preco,
        0
      );

      const [result] = await connection.query(
        "INSERT INTO pedidos (valor_total_pedido, qtd_items, data_pedido, endereco) VALUES (?, ?, NOW(), ?)",
        [valor_total_pedido, qtd_items,  endereco]
      );

      const id_pedido = result.insertId;

      for (const produto of produtos) {
        await connection.query(
          "INSERT INTO produtos_pedido (id_pedido, id_produto, quantidade, valor_unitario, valor_total) VALUES (?, ?, ?, ?, ?)",
          [
            id_pedido,
            produto.id,
            0,
            produto.preco,
            produto.preco,
          ]
        );
      }

      res.status(201).json({ id_pedido, valor_total_pedido, qtd_items, endereco });
    } catch (err) {
      console.error("Erro ao criar pedido:", err);
      res.status(500).send("Erro interno ao criar pedido");
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { qtd_items, endereco, produtos } = req.body;

    try {
      const valor_total_pedido = produtos.reduce(
        (acc, p) => acc + p.quantidade * p.valor_unitario,
        0
      );

      const [result] = await connection.query(
        "UPDATE pedidos SET valor_total_pedido = ?, qtd_items = ?, endereco = ? WHERE id = ?",
        [valor_total_pedido, qtd_items, endereco, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).send("Pedido não encontrado");
      }

      await connection.query("DELETE FROM produtos_pedidos WHERE id_pedido = ?", [id]);

      for (const produto of produtos) {
        await connection.query(
          "INSERT INTO produtos_pedidos (id_pedido, id_produto, quantidade, valor_unitario, valor_total) VALUES (?, ?, ?, ?, ?)",
          [
            id,
            produto.id_produto,
            produto.quantidade,
            produto.valor_unitario,
            produto.quantidade * produto.valor_unitario,
          ]
        );
      }

      res.send("Pedido atualizado com sucesso");
    } catch (err) {
      console.error("Erro ao atualizar pedido:", err);
      res.status(500).send("Erro interno ao atualizar pedido");
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await connection.query("DELETE FROM produtos_pedido WHERE id_pedido = ?", [id]);
      const [result] = await connection.query("DELETE FROM pedidos WHERE id = ?", [id]);

      if (result.affectedRows === 0) {
        return res.status(404).send("Pedido não encontrado");
      }

      res.send("Pedido removido com sucesso");
    } catch (err) {
      console.error("Erro ao deletar pedido:", err);
      res.status(500).send("Erro interno ao deletar pedido");
    }
  },
};
