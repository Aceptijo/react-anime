import { create } from 'zustand';
import { IGenres } from '@/models/Genres.ts';
import axios from 'axios';

type GenresStore = {
  genres: IGenres[];
  isLoading: boolean;
  error: null | string;
  fetchGenres: () => Promise<void>;
};

const useGenresStore = create<GenresStore>((set) => ({
  genres: [],
  isLoading: false,
  error: null,
  fetchGenres: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{ data: IGenres[] }>(
        'https://api.jikan.moe/v4/genres/anime'
      );
      set({ genres: response.data.data, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || 'Genres fetch error' });
      } else {
        set({ error: 'Unknown error' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useGenresStore;
