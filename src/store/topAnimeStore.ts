import { create } from 'zustand';
import { ITopAnime } from '@/models/TopAnime.ts';
import axios from 'axios';
import { IPagination } from '@/models/Pagination.ts';

type TopAnimeStore = {
  topAnime: ITopAnime[];
  pagination: IPagination | null;
  isLoading: boolean;
  error: null | string;
  fetchTopAnime: (limit: number, page: number) => Promise<void>;
  setTopAnime: (newAnime: ITopAnime[]) => void;
};

const useTopAnimeStore = create<TopAnimeStore>((set, get) => ({
  topAnime: [],
  pagination: null,
  isLoading: false,
  error: null,
  setTopAnime: (newAnime: ITopAnime[]) => {
    set((state) => ({
      topAnime: [...state.topAnime, ...newAnime],
    }));
  },
  fetchTopAnime: async (limit: number, page: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{
        data: ITopAnime[];
        pagination: IPagination;
      }>('https://api.jikan.moe/v4/top/anime', {
        params: {
          limit,
          page,
        },
      });
      // const uniqueTop = Array.from(
      //   new Set(response.data.data.map((item) => JSON.stringify(item)))
      // ).map((item) => JSON.parse(item));
      get().setTopAnime(response.data.data);
      set({ pagination: response.data.pagination, isLoading: false });
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
