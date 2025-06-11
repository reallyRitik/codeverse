import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [error, setError] = useState('');
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for auth loading to finish

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchApps = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/apps', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApps(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch apps');
      } finally {
        setLoadingApps(false);
      }
    };

    fetchApps();
  }, [token, router, loading]);

  if (loading) return <div>Loading...</div>; // Show loading while auth state is being restored
  if (!token) return null; // Prevent rendering before redirect

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Welcome to Your Dashboard, {user?.name}!</h1>
      <div className='mb-6 p-4 bg-gray-100 rounded'>
        <h2 className='text-lg font-semibold mb-2'>Your Details</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Joined:</strong> {new Date(user?.created_at).toLocaleDateString()}</p>
      </div>
      <h2 className='text-xl font-semibold mb-4'>Your Generated Apps</h2>
      {loadingApps ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : apps.length === 0 ? (
        <p>No apps generated yet. Start by submitting a prompt on the home page!</p>
      ) : (
        <div className='grid gap-4'>
          {apps.map((app) => (
            <div key={app.id} className='p-4 border rounded shadow'>
              <h3 className='text-lg font-semibold'>Prompt: {app.prompt}</h3>
              <pre className='text-sm mt-2'>{app.template}</pre>
              <p className='text-sm text-gray-500 mt-2'>
                Created: {new Date(app.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}