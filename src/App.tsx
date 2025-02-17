import './App.css';
import AppRouter from '@/components/AppRouter/AppRouter.tsx';
import Header from '@/components/Header/Header.tsx';

function App() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
