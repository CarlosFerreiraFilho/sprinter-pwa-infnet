'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PrivateRoute from '@/components/PrivateRoute';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    email: 'informação não consta',
    name: 'informação não consta',
    uid: 'informação não consta',
  });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      const { displayName, email, uid } = user;
      setUserData({
        name: displayName || 'informação não consta',
        email: email || 'informação não consta',
        uid: uid || 'informação não consta',
      });
    }
  }, [user, router]);

  return (
    <PrivateRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center mb-6">Perfil do Usuário</h1>
          <div className="space-y-6">
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <p className="text-sm font-semibold text-gray-600">Nome</p>
              <p className="text-lg font-medium text-gray-900">{userData.name}</p>
            </div>
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <p className="text-sm font-semibold text-gray-600">Email</p>
              <p className="text-lg font-medium text-gray-900">{userData.email}</p>
            </div>
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <p className="text-sm font-semibold text-gray-600">ID do Usuário</p>
              <p className="text-lg font-medium text-gray-900">{userData.uid}</p>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Profile;
