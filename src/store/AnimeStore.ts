import { create } from 'zustand';
import axios from 'axios';
import { IAnimeById } from '@/models/AnimeById.ts';
import { IFilters } from '@/models/Filters.ts';
import { IPagination } from '@/models/Pagination.ts';

type AnimeStore = {
  anime: IAnimeById[];
  filters: IFilters;
  pagination: IPagination | null;
  error: null | string;
  isLoading: boolean;
  setFilters: (filters: Partial<IFilters>) => void;
  removeFilters: () => void;
  fetchAnime: (page: number) => Promise<void>;
};

const useAnimeStore = create<AnimeStore>((set, get) => ({
  anime: [],
  pagination: null,
  filters: {
    genres: '',
    yearFrom: '',
    yearTo: '',
    score: 0,
    type: '',
    status: '',
    rating: '',
    orderBy: 'popularity',
    sort: 'asc',
  },
  isLoading: false,
  error: null,
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },
  removeFilters: () =>
    set(() => ({
      filters: {
        genres: '',
        yearFrom: '',
        yearTo: '',
        score: 0,
        type: '',
        status: '',
        rating: '',
        orderBy: 'popularity',
        sort: 'asc',
      },
    })),
  fetchAnime: async (page: number) => {
    set({ isLoading: true, error: null });

    const { filters } = get();

    const params = new URLSearchParams();

    if (filters.genres) params.append('genres', filters.genres);
    if (filters.yearFrom) params.append('start_date', `${filters.yearFrom}-01-01`);
    if (filters.yearTo) params.append('end_date', `${filters.yearTo}-12-31`);
    if (filters.score) params.append('min_score', String(filters.score));
    if (filters.type) params.append('type', `${filters.type}`);
    if (filters.rating) params.append('rating', filters.rating);
    if (filters.status) params.append('status', `${filters.status}`);
    if (filters.orderBy) params.append('order_by', filters.orderBy);
    if (filters.sort) params.append('sort', filters.sort);

    try {
      const response = await axios.get<{
        data: IAnimeById[];
        pagination: IPagination;
      }>(`https://api.jikan.moe/v4/anime?${params}`, {
        params: {
          page,
          limit: 24,
        },
      });
      const uniqueResponse = Array.from(
        new Set(response.data.data.map((item) => JSON.stringify(item)))
      ).map((item) => JSON.parse(item));
      set({
        anime: uniqueResponse,
        pagination: response.data.pagination,
        isLoading: false,
      });
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
