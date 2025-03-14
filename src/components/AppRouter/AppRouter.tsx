import { Routes, Route, Navigate } from 'react-router-dom';
import Top from '@/pages/Top.tsx';
import Catalog from '@/pages/Catalog.tsx';
import Calendar from '@/pages/Calendar.tsx';
import Main from '@/components/Main/Main.tsx';
import CatalogItem from '@/pages/CatalogItem.tsx';
import Profile from '@/pages/Profile.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/top" element={<Top />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/item/:id" element={<CatalogItem />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRouter;
