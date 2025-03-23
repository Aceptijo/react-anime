import { create } from 'zustand';
import { IAnimeEpisodes } from '@/models/AnimeEpisodes.ts';
import axios from 'axios';

type EpisodesStore = {
  episodes: IAnimeEpisodes[];
  isLoading: boolean;
  error: null | string;
  fetchEpisodes: (id: number) => Promise<void>;
};

const useEpisodesStore = create<EpisodesStore>((set) => ({
  episodes: [],
  isLoading: false,
  error: null,
  fetchEpisodes: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{ data: IAnimeEpisodes[] }>(
        `https://api.jikan.moe/v4/anime/${id}/episodes`
      );
      set({ episodes: response.data.data, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || 'Episodes fetch error' });
      } else {
        set({ error: 'Unknown error' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useEpisodesStore;
