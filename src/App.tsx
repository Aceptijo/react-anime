import './App.css';
import AppRouter from '@/components/AppRouter/AppRouter.tsx';
import NavBar from '@/components/NavBar/NavBar.tsx';
import Footer from '@/components/Footer/Footer.tsx';

function App() {
  return (
    <div className="flex flex-col items-center">
      <NavBar />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
