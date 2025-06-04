import express from 'express';
import UserController from '../controllers/UserController.js';
import * as AuthController from '../controllers/AuthController.js'; // Importa todas as funções
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', AuthController.login);

// rota pública
router.get('/', UserController.getAllUsers);

// rota protegida
router.get('/profile', authenticateToken, UserController.getProfile);

export default router;