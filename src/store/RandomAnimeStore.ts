import { create } from 'zustand';
import { IAnimeById } from '@/models/AnimeById.ts';
import axios from 'axios';

type RandomAnimeStore = {
  randomAnime: IAnimeById | null;
  isLoading: boolean;
  error: null | string;
  fetchRandomAnime: () => Promise<void>;
};

const useRandomAnimeStore = create<RandomAnimeStore>((set) => ({
  randomAnime: null,
  isLoading: false,
  error: null,
  fetchRandomAnime: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{
        data: IAnimeById;
      }>('https://api.jikan.moe/v4/random/anime');
      set({ randomAnime: response.data.data, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || err.message || 'Random anime fetch error' });
      } else set({ error: 'Unknown error!' });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useRandomAnimeStore;
