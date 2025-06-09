import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/router';

export default function Login() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleLogin = (userData) => {
    setUser(userData);
    router.push('/');
  };

  return (
    <div className='bg-blue-500 text-white p-4 min-h-screen'>
      <h1 className='text-3xl font-bold text-center mt-4'>Login to CodeVerse</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}