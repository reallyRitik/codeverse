import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
      });
      login(res.data.user, res.data.token);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border p-2 w-full rounded'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border p-2 w-full rounded'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border p-2 w-full rounded'
            placeholder='Enter your password'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full'
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
      <p className='mt-4'>
        Already have an account?{' '}
        <a href='/login' className='text-blue-500 hover:underline'>
          Login here
        </a>
      </p>
    </div>
  );
}