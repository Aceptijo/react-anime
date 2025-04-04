import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { IFirestoreAnime } from '@/models/FirestoreAnime.ts';
import { db } from '@/lib/Firebase/firebaseConfig.ts';

export const removeAnimeFromList = async (
  userId: string,
  listName: 'favorites' | 'watching' | 'planned' | 'dropped',
  animeId: number
) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) return;

  const userData = userDoc.data();
  const currentList: IFirestoreAnime[] = userData.animeLists?.[listName] || [];

  const updateList = currentList.filter((anime) => anime.id !== animeId);

  await updateDoc(userRef, {
    [`animeLists.${listName}`]: updateList,
  });
};
