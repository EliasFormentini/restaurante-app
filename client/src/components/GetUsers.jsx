import { useEffect, useState } from 'react';
import client from '../api/Api';

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    role: '',
  });

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await client.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este usuário?')) return;
    const token = localStorage.getItem('token');

    try {
      await client.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter((u) => u.id !== id));
      alert('Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      nome: user.nome || '',
      email: user.email,
      role: user.role,
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ nome: '', email: '', role: '' });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    try {
      await client.put(`/users/${editingUser.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, ...formData } : u
        )
      );
      setEditingUser(null);
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#2b3e3b' }}>
        Gerenciar Usuários
      </h1>

      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="border rounded p-4 shadow-md flex justify-between items-center"
            >
              {editingUser?.id === user.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    className="border px-2 py-1 rounded"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                  />
                  <input
                    className="border px-2 py-1 rounded"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <select
                    className="border px-2 py-1 rounded"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              ) : (
                <div>
                  <p className="font-semibold">{user.email}</p>
                  <p>Nome: {user.nome}</p>
                  <p>Função: {user.role}</p>
                </div>
              )}

              <div className="flex gap-2">
                {editingUser?.id === user.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      style={{ backgroundColor: '#2b3e3b' }}
                    >
                      Salvar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      style={{ backgroundColor: '#2b3e3b' }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Deletar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetUsers;
