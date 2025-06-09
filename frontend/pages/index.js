import PromptForm from '../components/PromptForm';

export default function Home() {
  return (
    <div className='bg-blue-500 text-white p-4 min-h-screen'>
      <h1 className='text-3xl font-bold text-center mt-4'>Welcome to CodeVerse</h1>
      <p className='text-center mt-2'>Generate apps with AI</p>
      <PromptForm />
    </div>
  );
}