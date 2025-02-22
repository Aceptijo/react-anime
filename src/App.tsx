import './App.css';
import AppRouter from '@/components/AppRouter/AppRouter.tsx';
import NavBar from '@/components/NavBar/NavBar.tsx';
import Footer from '@/components/Footer/Footer.tsx';

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavBar />
      <div className="w-full flex-grow">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}

export default App;
