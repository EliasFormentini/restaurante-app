import { useState, useEffect } from "react";
import client from "../api/Api";

const GetPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  const listPedidos = async () => {
    try {
      const res = await client.get("/pedidos");
      setPedidos(res.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      alert("Erro ao buscar pedidos");
    }
  };

  useEffect(() => {
    listPedidos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar este pedido?")) return;

    try {
      await client.delete(`/pedidos/${id}`);
      alert("Pedido deletado com sucesso!");
      setPedidos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
      alert("Erro ao deletar pedido");
    }
  };

  return (
    <div className="p-6">
      {pedidos.length === 0 && (
        <p className="text-center text-gray-500">Nenhum pedido encontrado.</p>
      )}

      {pedidos.map((pedido) => (
        <div key={pedido.id} className="mb-10 border p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">
            Pedido #{pedido.id} - {pedido.nome_usuario} ({pedido.email_usuario})
          </h2>
          <p className="text-sm text-gray-600 mb-1">Endereço: {pedido.endereco}</p>
          <p className="text-sm text-gray-600 mb-1">
            Data: {new Date(pedido.data_pedido).toLocaleString()}
          </p>
          <p className="text-md font-semibold mb-4">
            Valor Total: R$ {pedido.valor_total_pedido.toFixed(2)}
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
                <p className="text-sm">Preço: R$ {produto.valor_unitario.toFixed(2)}</p>
                <p className="text-sm">Qtd: {produto.quantidade}</p>
                <p className="text-sm">
                  Total: R$ {produto.valor_total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={() => handleDelete(pedido.id)}
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
