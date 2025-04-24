import connection from "../db/connection.js";

export default {
  async index(req, res) {
    const [produtos] = await connection.query("SELECT * FROM produtos");
    res.json({ produtos });
  },

  async findOne(req, res) {
    const [produto] = await connection.query("SELECT * FROM produtos WHERE id = ?", [req.params.id]);

    if (!produto.length) {
      return res.status(404).send("Produto não encontrado");
    }

    res.json(produto[0]);
  },

  async create(req, res) {
    const { nome, descricao, imagem, preco } = req.body;

    try {
      const [result] = await connection.query(
        "INSERT INTO produtos (nome, descricao, imagem, preco) VALUES (?, ?, ?, ?)",
        [nome, descricao, imagem, preco]
      );

      res.status(201).json({ id: result.insertId, nome, descricao, imagem });
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      res.status(500).send("Erro interno ao criar produto");
    }
  },

  async update(req, res) {
    const { nome, descricao, imagem, preco } = req.body;
    const { id } = req.params;

    try {
      const [result] = await connection.query(
        "UPDATE produtos SET nome = ?, descricao = ?, imagem = ?, preco = ? WHERE id = ?",
        [nome, descricao, imagem, preco, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).send("Produto não encontrado");
      }

      res.send("Produto atualizado com sucesso");
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      res.status(500).send("Erro interno ao atualizar produto");
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const [result] = await connection.query("DELETE FROM produtos WHERE id = ?", [id]);

      if (result.affectedRows === 0) {
        return res.status(404).send("Produto não encontrado");
      }

      res.send("Produto removido com sucesso");
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      res.status(500).send("Erro interno ao deletar produto");
    }
  },
};
