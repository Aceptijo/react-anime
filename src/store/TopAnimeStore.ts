import { create } from 'zustand';
import { ITopAnime } from '@/models/TopAnime.ts';
import axios from 'axios';

type TopAnimeStore = {
  topAnime: ITopAnime[];
  isLoading: boolean;
  error: null | string;
  fetchTopAnime: () => Promise<void>;
};

const useTopAnimeStore = create<TopAnimeStore>((set) => ({
  topAnime: [],
  isLoading: false,
  error: null,
  fetchTopAnime: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{ data: ITopAnime[] }>(
        'https://api.jikan.moe/v4/top/anime',
        {
          params: {
            limit: 20,
          },
        }
      );
      set({ topAnime: response.data.data, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || 'Top anime fetch error' });
      } else {
        set({ error: 'Unknown error' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTopAnimeStore;
