import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegister
      ? 'http://localhost:3000/api/users/register'
      : 'http://localhost:3000/api/users/login';

    const payload = isRegister
      ? { nome, email, password }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        alert(data.message || 'Erro');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-10 to-green-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-10" style={{ color: '#2b3e3b' }}>
        Mandarito Cozinha
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2
          className="text-2xl font-semibold text-center"
          style={{ color: '#2b3e3b' }}
        >
          {isRegister ? 'Criar Conta' : 'Iniciar Sessão'}
        </h2>

        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>

        <button
          className="w-full text-white py-2 rounded-md transition hover:bg-[#1f2a29] cursor-pointer"
          style={{ backgroundColor: '#2b3e3b' }}
        >
          {isRegister ? 'Registrar' : 'Entrar'}
        </button>

        <p className="text-sm text-center">
          {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
          <span
            className="text-[#b86f4c] font-semibold cursor-pointer hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Fazer login' : 'Cadastrar'}
          </span>
        </p>
      </form>
    </div>
  );
}
