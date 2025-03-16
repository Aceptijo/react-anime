import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCBLSuEZArAVoIjMNKSnqJoJssJrn-Kh3Q',
  authDomain: 'react-anime-45b11.firebaseapp.com',
  projectId: 'react-anime-45b11',
  storageBucket: 'react-anime-45b11.firebasestorage.app',
  messagingSenderId: '866503061460',
  appId: '1:866503061460:web:0e97779e83123ec8ab7041',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
