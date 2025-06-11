import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function Callback() {
  const router = useRouter();
  const { login } = useAuth();

 useEffect(() => {
    const handleCallback = async () => {
        try {
            const provider = 'google';
            const res = await axios.get(`http://127.0.0.1:8000/api/auth/${provider}/callback`, {
                params: router.query,
            });
            login(res.data.user, res.data.token);
            router.push('/dashboard');
        } catch (err) {
            console.error('Callback error:', err);
            router.push('/login');
        }
    };

    if (router.query && Object.keys(router.query).length > 0) {
        handleCallback();
    }
}, [router.query]);

  return <div className='p-4'>Processing authentication...</div>;
}