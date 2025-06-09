import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Runs only in the browser
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/login';
  };

  return (
    <nav className='bg-blue-600 text-white p-4'>
      <div className='max-w-4xl mx-auto flex justify-between items-center'>
        <div>
          <Link href='/' className='text-xl font-bold'>CodeVerse</Link>
        </div>
        <div className='space-x-4'>
          <Link href='/' className='hover:underline'>Home</Link>
          <Link href='/dashboard' className='hover:underline'>Dashboard</Link>
          {token ? (
            <button onClick={handleLogout} className='hover:underline'>Logout</button>
          ) : (
            <Link href='/login' className='hover:underline'>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
