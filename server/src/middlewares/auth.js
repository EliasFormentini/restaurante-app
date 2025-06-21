import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'seu_token_secreto';


export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = user; 
    next();
  });
}

export function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado: requer administrador' });
  }
  next();
}
