import useAuthStore from '@/store/authStore.ts';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useAuthStore();

  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
