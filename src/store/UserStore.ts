import { create } from 'zustand';
import { IAnimeById } from '@/models/AnimeById.ts';

type UserStore = {
  watched: IAnimeById[];
  // planned: IAnimeById[];
  // dropped: IAnimeById[];
  // favorite: IAnimeById[];
  isLoading: boolean;
  error: null | string;
  addToWatched: (anime: IAnimeById) => void;
  // removeFromWatched: (id: number) => Promise<void>;
  // addToPlanned: (anime: IAnimeById) => Promise<void>;
  // removeFromPlanned: (id: number) => Promise<void>;
  // addToDropped: (anime: IAnimeById) => Promise<void>;
  // removeFromDropped: (id: number) => Promise<void>;
  // addToFavorite: (anime: IAnimeById) => Promise<void>;
  // removeFromFavorite: (id: number) => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  watched: [],
  planned: [],
  dropped: [],
  favorite: [],
  isLoading: false,
  error: null,
  addToWatched: (anime: IAnimeById) => {
    set((state) => ({
      watched: [...state.watched, anime],
    }));
  },
  // removeFromWatched: (id: number) => {
  //   set(state => ({
  //     watched: (items) => state.
  //   }))
  // }
}));

export default useUserStore;
