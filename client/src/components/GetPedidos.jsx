import { useState, useEffect } from "react";
import client from "../api/Api";

const GetPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  const listPedidos = async () => {
    try {
      const res = await client.get("/pedidos");
      console.log(res.data);
      if (res.data) {
        setPedidos(res.data.pedidos);
      } else {
        setPedidos([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listPedidos();
  }, []);

  
  const [pedidosAG, setPedidosAG] = useState([]);

  // Suponha que você tem os dados crus em data:
  useEffect(() => {
    const pedidosAgrupados = pedidos.reduce((acc, item) => {
      if (!acc[item.id_pedido]) {
        acc[item.id_pedido] = {
          id_pedido: item.id_pedido,
          endereco: item.endereco,
          data_pedido: item.data_pedido,
          valor_total_pedido: item.valor_total_pedido,
          produtos: [],
        };
      }
  
      acc[item.id_pedido].produtos.push({
        id_produto: item.id_produto,
        nome: item.nome,
        descricao: item.descricao,
        imagem: item.imagem,
        valor_unitario: item.valor_unitario,
        quantidade: item.quantidade,
        valor_total: item.valor_total,
      });
  
      return acc;
    }, {});
  
    setPedidosAG(Object.values(pedidosAgrupados)); // só define quando tiver pronto
  }, [pedidos]);

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar este pedido?")) return;

    try {
      const response = await client.delete(
        `/pedidos/${id}`
      );

      if (response.status === 200) {
        alert("Pedido deletado com sucesso!");
        setPedidosAG((prev) => prev.filter((p) => p.id_pedido !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
      if (error.response) {
        alert(`Erro: ${error.response.data}`);
      } else {
        alert(error);
      }
    }
  };

  return (
    <div className="p-6">
      {pedidosAG.map((pedido) => (
        <div key={pedido.id_pedido} className="mb-10 border p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Pedido #{pedido.id_pedido}</h2>
          <p className="text-sm text-gray-600 mb-2">Endereço: {pedido.endereco}</p>
          <p className="text-sm text-gray-600 mb-4">
            Data: {new Date(pedido.data_pedido).toLocaleString()}
          </p>
          <p className="text-md font-semibold mb-4">
            Valor Total: R$ {pedido.valor_total_pedido}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pedido.produtos.map((produto, index) => (
              <div key={index} className="border rounded p-3">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="font-semibold">{produto.nome}</h3>
                <p className="text-sm text-gray-700">{produto.descricao}</p>
                <p className="text-sm">Preço: R$ {produto.valor_unitario}</p>
                <p className="text-sm">Total: R$ {produto.valor_total}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={() => handleDelete(pedido.id_pedido)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Deletar Pedido
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetPedidos;
