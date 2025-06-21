import db from '../../models/index.js';
const { User } = db;
import bcrypt from 'bcrypt';

export default {
  async getAllUsers(req, res) {
    const users = await User.findAll({ attributes: ['id', 'email', 'role'] });
    res.json(users);
  },

  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'email', 'role'],
      });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { email, password, role } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (email) user.email = email;
      if (role) user.role = role;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();
      res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await user.destroy();
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  },
};
