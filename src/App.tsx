import './App.css';
import AppRouter from '@/components/AppRouter/AppRouter.tsx';
import Header from '@/components/Header/Header.tsx';
import Footer from '@/components/Footer/Footer.tsx';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <main className="w-full flex-grow">
        <AppRouter />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
}

export default App;
