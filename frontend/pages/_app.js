import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/NavBar';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}