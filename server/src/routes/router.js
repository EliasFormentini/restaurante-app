import express from "express"
import ProdutoController from "../controllers/ProdutoController.js"
import PedidoController from "../controllers/PedidoController.js"
import userRoutes from './user.routes.js';

const router = express.Router()

// Produtos
router.get("/produtos", ProdutoController.index)
router.get("/produtos/:id", ProdutoController.findOne)
router.post("/produtos", ProdutoController.create)
router.put("/produtos/:id", ProdutoController.update)
router.delete("/produtos/:id", ProdutoController.delete)

//Pedidos
router.get("/pedidos", PedidoController.index)
router.get("/pedidos/:id", PedidoController.findOne)
router.post("/pedidos", PedidoController.create)
router.delete("/pedidos/:id", PedidoController.delete)

//Users
router.use('/users', userRoutes);

export default router;