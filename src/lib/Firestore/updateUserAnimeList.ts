import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig.ts';
import { IFirestoreAnime } from '@/models/FirestoreAnime.ts';

export const updateUserAnimeList = async (
  userId: string,
  listName: 'favorites' | 'watching' | 'planned' | 'dropped',
  anime: IFirestoreAnime
) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) return;

    const userData = userDoc.data();
    const currentList: IFirestoreAnime[] = userData.animeList?.[listName] || [];

    const animeExists = currentList.some((item) => item.id === anime.id);

    await updateDoc(userRef, {
      [`animeLists.${listName}`]: animeExists
        ? arrayRemove(currentList.find((item) => item.id === anime.id))
        : arrayUnion(anime),
    });
  } catch (err) {
    console.error('Update error:', err);
  }
};
