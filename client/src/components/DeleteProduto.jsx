import client from "../api/Api";
import { Button } from "@mui/material";

function DeleteProduto( {id} ) {

  const handleDelete = async () => {
    try {
      console.log(id);
      await client.delete(`/produtos/${id}`);
      console.log(`Produto com o ID ${id} deletado com sucesso!`);
      alert(`Produto com o ID ${id} deletado com sucesso!`);
      window.location.href = "http://localhost:5173/getProdutos";
    } catch (err) {
      console.error('Erro ao deletar produto:', err.response?.data || err.message);
    }
  };

  return (
    <Button size="small" color="primary" onClick={handleDelete}>Deletar</Button>
  );
}

export default DeleteProduto;
