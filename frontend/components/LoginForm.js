import { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border p-2 w-full rounded mb-2'
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border p-2 w-full rounded mb-2'
          placeholder='Password'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          Login
        </button>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </form>
    </div>
  );
}