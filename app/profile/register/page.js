'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '../../public/utils/firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const user = await signUp(email, password, name);
      console.log('Usuário registrado com sucesso:', user);

      router.push('/home');
    } catch (error) {
      setError('Erro ao registrar o usuário: ' + error.message);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">Registrar</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nome"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
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
              className={`w-full border p-3 rounded-lg focus:outline-none transition-colors ${passwordMatch ? 'border-gray-300 focus:border-blue-500' : 'border-red-500 focus:border-red-500'
                }`}
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirme a Senha"
              className={`w-full border p-3 rounded-lg focus:outline-none transition-colors ${passwordMatch ? 'border-gray-300 focus:border-blue-500' : 'border-red-500 focus:border-red-500'
                }`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full background-primary text-white p-3 rounded-lg font-semibold  ${passwordMatch ? '' : 'opacity-50 cursor-not-allowed'
              }`}
            disabled={!passwordMatch}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
