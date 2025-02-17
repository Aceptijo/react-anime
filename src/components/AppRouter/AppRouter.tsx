import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home.tsx';
import Top from '@/pages/Top.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/top" element={<Top />} />
    </Routes>
  );
};

export default AppRouter;
