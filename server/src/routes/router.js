import express from "express"
import ProdutoController from "../controllers/ProdutoController.js"
import PedidoController from "../controllers/PedidoController.js"
import userRoutes from './user.routes.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router()

// Produtos
router.get("/produtos", authenticateToken, ProdutoController.index)
router.get("/produtos/:id", authenticateToken, ProdutoController.findOne)
router.post("/produtos", authenticateToken, ProdutoController.create)
router.put("/produtos/:id", authenticateToken, ProdutoController.update)
router.delete("/produtos/:id", authenticateToken, ProdutoController.delete)

// Pedidos
router.get("/pedidos", authenticateToken, PedidoController.index)
router.get("/pedidos/:id", authenticateToken, PedidoController.findOne)
router.post("/pedidos", authenticateToken, PedidoController.create)
router.put("/pedidos/:id", authenticateToken, PedidoController.update)
router.delete("/pedidos/:id", authenticateToken, PedidoController.delete)

// Users
router.use('/users', userRoutes);

export default router;