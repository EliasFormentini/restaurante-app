

// src/controllers/UserController.js
import db from '../../models/index.js';
const { User } = db;

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
};
