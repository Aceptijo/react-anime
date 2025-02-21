import { Routes, Route, Navigate } from 'react-router-dom';
import Top from '@/pages/Top.tsx';
import Catalog from '@/pages/Catalog.tsx';
import Releases from '@/pages/Releases.tsx';
import Calendar from '@/pages/Calendar.tsx';
import Random from '@/pages/Random.tsx';
import Main from '@/components/Main/Main.tsx';
import CatalogItem from '@/pages/CatalogItem.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/top" element={<Top />} />
      <Route path="/random" element={<Random />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/item/:title" element={<CatalogItem />} />
      <Route path="/releases" element={<Releases />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
};

export default AppRouter;
