import { User, onAuthStateChanged } from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '@/lib/firebaseConfig.ts';

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: auth.currentUser,
  setUser: (user) => set({ user }),
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});

export default useAuthStore;
