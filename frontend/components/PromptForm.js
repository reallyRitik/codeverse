import { useState } from 'react';
import axios from 'axios';

export default function PromptForm() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const aiRes = await axios.post('http://localhost:3001/api/ai/generate', { prompt });
      setResult(aiRes.data.template);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login first');
      await axios.post('http://localhost:8000/api/apps', {
        prompt,
        template: aiRes.data.template,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className='border p-2 w-full rounded'
          placeholder='Enter app idea (e.g., Build a to-do app)'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 mt-2 rounded hover:bg-blue-600'
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate App'}
        </button>
      </form>
      {result && (
        <div className='mt-4 p-4 bg-gray-100 rounded'>
          <h2 className='text-lg font-semibold'>Generated Template:</h2>
          <pre className='text-sm'>{result}</pre>
        </div>
      )}
    </div>
  );
}