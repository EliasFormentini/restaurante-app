import express from 'express';
import UserController from '../controllers/UserController.js';
import * as AuthController from '../controllers/AuthController.js';
import { authenticateToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// 🔑 Autenticação
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// 🔐 Perfil pessoal (qualquer usuário autenticado)
router.get('/profile', authenticateToken, UserController.getProfile);

// 🔒 Gerenciamento de usuários (apenas admin)
router.get('/', authenticateToken, isAdmin, UserController.getAllUsers);
router.put('/:id', authenticateToken, isAdmin, UserController.updateUser);
router.delete('/:id', authenticateToken, isAdmin, UserController.deleteUser);

export default router;
