import { create } from 'zustand';
import axios from 'axios';
import { IAnimeById } from '@/models/AnimeById.ts';
import { IFilters } from '@/models/Filters.ts';
import { IPagination } from '@/models/Pagination.ts';

type AnimeStore = {
  anime: IAnimeById[];
  filters: IFilters;
  pagination: IPagination | null;
  isLoading: boolean;
  error: null | string;
  fetchAnime: (page: number) => Promise<void>;
  setFilters: (filters: Partial<IFilters>) => void;
};

const useAnimeStore = create<AnimeStore>((set, get) => ({
  anime: [],
  filters: {
    genres: '',
    yearFrom: '',
    yearTo: '',
    score: 0,
    season: [],
    type: [],
    status: [],
  },
  pagination: null,
  isLoading: false,
  error: null,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  fetchAnime: async (page: number) => {
    set({ isLoading: true, error: null });

    const { filters } = get();
    const params = new URLSearchParams();

    if (filters.genres) params.append('genres', filters.genres);
    if (filters.yearFrom) params.append('start_date', `${filters.yearFrom}-01-01`);
    if (filters.yearTo) params.append('end_date', `${filters.yearTo}-12-31`);
    if (filters.score) params.append('score', String(filters.score));
    if (filters.season.length) params.append('season', filters.season.join(','));
    if (filters.type.length) params.append('type', filters.type.join(','));
    if (filters.status.length) params.append('status', filters.status.join(','));

    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?${params}`, {
        params: {
          page,
          limit: 24,
        },
      });
      set({ anime: response.data.data, pagination: response.data.pagination, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || err.message || 'Filters error' });
      } else {
        set({ error: 'Unknown error!' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAnimeStore;
