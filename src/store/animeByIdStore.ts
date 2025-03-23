import { create } from 'zustand';
import axios from 'axios';
import { IAnimeById } from '@/models/AnimeById.ts';

type AnimeByIdStore = {
  fetchedAnime: IAnimeById | null;
  isLoading: boolean;
  error: null | string;
  fetchById: (id: number) => Promise<void>;
};

const useAnimeByIdStore = create<AnimeByIdStore>((set) => ({
  fetchedAnime: null,
  isLoading: false,
  error: null,
  fetchById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{
        data: IAnimeById;
      }>(`https://api.jikan.moe/v4/anime/${id}/full`);
      set({ fetchedAnime: response.data.data, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || 'Fetch error' });
      } else {
        set({ error: 'Unknown error' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAnimeByIdStore;
