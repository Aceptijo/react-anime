import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home.tsx';
import Top from '@/pages/Top.tsx';
import Catalog from '@/pages/Catalog.tsx';
import Releases from '@/pages/Releases.tsx';
import Calendar from '@/pages/Calendar.tsx';
import Random from '@/pages/Random.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/top" element={<Top />} />
      <Route path="/random" element={<Random />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/releases" element={<Releases />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
};

export default AppRouter;
