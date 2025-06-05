import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.message || 'Erro ao fazer login');
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
          Iniciar sessão
        </h2>

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

        <button className="w-full text-white py-2 rounded-md transition bg-[#2b3e3b] hover:bg-[#1f2a29] cursor-pointer">
          Entrar
        </button>
      </form>
    </div>
  );
}
