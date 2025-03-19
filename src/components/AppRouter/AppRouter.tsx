import { Routes, Route, Navigate } from 'react-router-dom';
import Top from '@/pages/Top.tsx';
import Catalog from '@/pages/Catalog.tsx';
import Calendar from '@/pages/Calendar.tsx';
import Main from '@/components/Main/Main.tsx';
import CatalogItem from '@/pages/CatalogItem.tsx';
import Profile from '@/pages/Profile.tsx';
import Users from '@/pages/Users.tsx';
import SignIn from '@/pages/SignIn.tsx';
import SignUp from '@/pages/SignUp.tsx';
import useAuthStore from '@/store/authStore.ts';

const AppRouter = () => {
  const { user } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/top" element={<Top />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/item/:id" element={<CatalogItem />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/users" element={<Users />} />
      <Route path="/sign-in" element={user ? <Navigate to="/" /> : <SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default AppRouter;
