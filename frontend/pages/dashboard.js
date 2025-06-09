import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Please login');
        const res = await axios.get('http://localhost:8000/api/apps', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApps(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchApps();
  }, []);

  return (
    <div className='bg-blue-500 text-white p-4 min-h-screen'>
      <h1 className='text-3xl font-bold text-center mt-4'>Your Apps</h1>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <div className='mt-4 max-w-2xl mx-auto'>
          {apps.length === 0 ? (
            <p className='text-center'>No apps generated yet</p>
          ) : (
            apps.map((app) => (
              <div key={app.id} className='p-4 bg-gray-100 text-black rounded mb-2'>
                <h2 className='text-lg font-semibold'>{app.prompt}</h2>
                <pre className='text-sm'>{app.template}</pre>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}