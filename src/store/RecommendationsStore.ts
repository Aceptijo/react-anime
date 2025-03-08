import { create } from 'zustand';
import axios from 'axios';
import { IRecommendations } from '@/models/Recommendations.ts';

type RecommendationsStore = {
  anime: IRecommendations[];
  isLoading: boolean;
  error: string | null;
  fetchRecommendations: () => Promise<void>;
};

const useRecommendationsStore = create<RecommendationsStore>((set) => ({
  anime: [],
  isLoading: false,
  error: null,
  fetchRecommendations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{ data: IRecommendations[] }>(
        'https://api.jikan.moe/v4/recommendations/anime'
      );
      const uniqueRecommendations = response.data.data
        .reduce((acc, item) => {
          if (!acc.some((rec) => rec.mal_id === item.mal_id)) {
            acc.push(item);
          }
          return acc;
        }, [] as IRecommendations[])
        .slice(0, 20);
      set({ anime: uniqueRecommendations, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || err.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useRecommendationsStore;
