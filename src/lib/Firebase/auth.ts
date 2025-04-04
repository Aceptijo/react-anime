import { auth } from '@/lib/Firebase/firebaseConfig.ts';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import useAuthStore from '@/store/authStore.ts';
import { addFirestoreUser } from '@/lib/Firestore/addFirestoreUser.ts';

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    useAuthStore.getState().setUser(userCredential.user);
    await addFirestoreUser(userCredential.user);
  } catch (err) {
    console.error('Registration error', err);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    useAuthStore.getState().setUser(userCredential.user);
  } catch (err) {
    console.error('SignIn error', err);
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    useAuthStore.getState().setUser(userCredential.user);
    await addFirestoreUser(userCredential.user);
  } catch (err) {
    console.error('SignInWithGoogle error', err);
  }
};

export const loginWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    useAuthStore.getState().setUser(userCredential.user);
    await addFirestoreUser(userCredential.user);
  } catch (err) {
    console.error('Github error', err);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    useAuthStore.getState().setUser(null);
  } catch (err) {
    console.error('SignOut error', err);
  }
};
