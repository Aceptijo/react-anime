import { create } from 'zustand';
import { IAnimeById } from '@/models/AnimeById.ts';
import axios from 'axios';

type SearchStore = {
  query: string;
  result: IAnimeById[];
  isLoading: boolean;
  error: null | string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
  searchAnime: (query: string) => Promise<void>;
};

const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  result: [],
  isLoading: false,
  error: null,
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
  setQuery: (query) => set({ query }),
  searchAnime: async (query) => {
    if (!query) {
      set({ result: [], isOpen: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
      set({ result: response.data.data, isLoading: false, isOpen: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || err.message || 'Search error' });
      } else {
        set({ error: 'Unknown error!' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSearchStore;
