import './App.css';
import AppRouter from '@/components/AppRouter/AppRouter.tsx';
import NavBar from '@/components/NavBar/NavBar.tsx';

function App() {
  return (
    <div className="flex flex-col items-center">
      <NavBar />
      <AppRouter />
    </div>
  );
}

export default App;
