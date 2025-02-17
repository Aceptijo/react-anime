import { create } from 'zustand';
import axios from 'axios';
import { ICurrentSeason } from '@/models/CurrentSeason.ts';

type CurrentSeasonStore = {
  seasonAnime: ICurrentSeason[];
  isLoading: boolean;
  error: string | null;
  fetchSeasonAnime: () => Promise<void>;
};

const useCurrentSeasonStore = create<CurrentSeasonStore>((set) => ({
  seasonAnime: [],
  isLoading: false,
  error: null,
  fetchSeasonAnime: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{ data: ICurrentSeason[] }>(
        'https://api.jikan.moe/v4/seasons/now'
      );
      const limit = response.data.data.slice(0, 20);
      set({ seasonAnime: limit });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || err.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCurrentSeasonStore;
