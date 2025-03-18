import './App.css';
import AppRouter from '@/components/AppRouter/AppRouter.tsx';
import Header from '@/components/Header/Header.tsx';
import Footer from '@/components/Footer/Footer.tsx';
import { Toaster } from 'sonner';
import useAuthStore from '@/store/authStore.ts';

function App() {
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col items-center">
      {user ? (
        <>
          <Header />
          <main className="w-full flex-grow">
            <AppRouter />
            <Toaster />
          </main>
          <Footer />
        </>
      ) : (
        <main className="w-full flex-grow">
          <AppRouter />
        </main>
      )}
    </div>
  );
}

export default App;
