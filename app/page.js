// app/page.js
'use client'

import { useState } from 'react';
import { signIn } from '../public/utils/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      router.push('/home');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Verificando autenticação...</div>;
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full background-primary text-white p-3 rounded-lg font-semibold"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-4">
          Não tem uma conta?{' '}
          <a href="/register" className="text-blue-500 hover:underline">Registre-se</a>
        </p>
      </div>
    </div>
  );
}
