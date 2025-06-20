import connection from "../db/connection.js";

export default {
  async index(req, res) {
    try {
      const [pedidos] = await connection.query(
        `SELECT p.*, 
                pp.id_produto, 
                pp.quantidade, 
                pp.valor_unitario, 
                pp.valor_total, 
                pr.nome AS nome, 
                pr.descricao, 
                pr.imagem, 
                pr.preco 
         FROM pedidos p 
         JOIN produtos_pedidos pp ON pp.id_pedido = p.id 
         JOIN produtos pr ON pr.id = pp.id_produto`
      );
      res.json(pedidos);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      res.status(500).json({ error: 'Erro interno ao buscar pedidos' });
    }
  },

  async findOne(req, res) {
    const { id } = req.params;

    try {
      const [pedido] = await connection.query(
        "SELECT * FROM pedidos WHERE id = ?",
        [id]
      );

      if (!pedido.length) {
        return res.status(404).send("Pedido não encontrado");
      }

      const [produtos] = await connection.query(
        `SELECT pp.*, p.nome, p.descricao, p.imagem, p.preco 
         FROM produtos_pedidos pp 
         JOIN produtos p ON pp.id_produto = p.id 
         WHERE pp.id_pedido = ?`,
        [id]
      );

      res.json({ ...pedido[0], produtos });
    } catch (error) {
      console.error("Erro ao buscar pedido:", error);
      res.status(500).json({ error: 'Erro interno ao buscar pedido' });
    }
  },

  async create(req, res) {
    const { qtd_items, endereco, produtos } = req.body;

    try {
      const valor_total_pedido = produtos.reduce(
        (acc, p) => acc + (p.preco * (p.quantidade || 1)),
        0
      );

      const [result] = await connection.query(
        "INSERT INTO pedidos (valor_total_pedido, qtd_items, data_pedido, endereco) VALUES (?, ?, NOW(), ?)",
        [valor_total_pedido, qtd_items, endereco]
      );

      const id_pedido = result.insertId;

      for (const produto of produtos) {
        const quantidade = produto.quantidade || 1;
        await connection.query(
          "INSERT INTO produtos_pedidos (id_pedido, id_produto, quantidade, valor_unitario, valor_total) VALUES (?, ?, ?, ?, ?)",
          [
            id_pedido,
            produto.id,
            quantidade,
            produto.preco,
            quantidade * produto.preco,
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

      await connection.query(
        "DELETE FROM produtos_pedidos WHERE id_pedido = ?",
        [id]
      );

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
      await connection.query("DELETE FROM produtos_pedidos WHERE id_pedido = ?", [id]);
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
