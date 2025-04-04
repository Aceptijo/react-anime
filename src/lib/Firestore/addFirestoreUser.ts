import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig.ts';
import { User } from 'firebase/auth';

export const addFirestoreUser = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      id: user.uid,
      email: user.email,
      name: user.displayName || 'Anonymous',
      animeLists: {
        favorites: [],
        watching: [],
        planned: [],
        dropped: [],
      },
    });
  }
};
