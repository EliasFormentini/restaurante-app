import db from '../../models/index.js';
const { User } = db;

export default {
  // ✅ Lista todos os usuários (admin)
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email', 'role'],
      });
      res.json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  },

  // ✅ Perfil do próprio usuário (autenticado)
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'nome', 'email', 'role'],
      });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ message: 'Erro ao buscar perfil' });
    }
  },

  // ✅ Atualizar usuário (apenas admin)
  async updateUser(req, res) {
    const { id } = req.params;
    const { nome, email, role } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      user.nome = nome || user.nome;
      user.email = email || user.email;
      user.role = role || user.role;

      await user.save();

      res.json({
        message: 'Usuário atualizado com sucesso',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  },

  // ✅ Deletar usuário (apenas admin)
  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await user.destroy();

      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
  },
};
