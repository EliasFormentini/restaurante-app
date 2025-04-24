import express from "express"
import ProdutoController from "../controller/ProdutoController.js"
import PedidoController from "../controller/PedidoController.js"

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

export default router;