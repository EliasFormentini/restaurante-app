import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { User } = db;
const SECRET = 'seu_token_secreto'; // melhor usar variável de ambiente

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user)
    return res.status(401).json({ message: 'Usuário não encontrado' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: 'Senha inválida' });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
    expiresIn: '1h',
  });
  return res.json({ token });
}
