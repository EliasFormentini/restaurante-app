import express from 'express';
import UserController from '../controllers/UserController.js';
import * as AuthController from '../controllers/AuthController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// Ações administrativas
router.get('/', authenticateToken, UserController.getAllUsers);
router.get('/profile', authenticateToken, UserController.getProfile);
router.put('/:id', authenticateToken, UserController.updateUser);
router.delete('/:id', authenticateToken, UserController.deleteUser);

export default router;
