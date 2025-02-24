import { create } from 'zustand';
import { IStatistics } from '@/models/Statistics.ts';
import axios from 'axios';

type StatisticsStore = {
  statistics: IStatistics | null;
  isLoading: boolean;
  error: null | string;
  fetchStatistics: (id: number) => Promise<void>;
};

const useStatisticsStore = create<StatisticsStore>((set) => ({
  statistics: null,
  isLoading: false,
  error: null,
  fetchStatistics: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{ data: IStatistics }>(
        `https://api.jikan.moe/v4/anime/${id}/statistics`
      );
      set({ statistics: response.data.data, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || 'Statistics fetch error' });
      } else {
        set({ error: 'Unknown error' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStatisticsStore;
