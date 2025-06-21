import db from '../../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { User } = db;

const secret = process.env.JWT_SECRET || 'seusegredoaqui';

export async function register(req, res) {
  const { nome, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      nome,
      email,
      password: hashedPassword,
      role: 'user'
    });

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: '4h'
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar', error });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: '4h'
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
}
