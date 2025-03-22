import { create } from 'zustand';
import axios from 'axios';
import { IReviews } from '@/models/Reviews.ts';

type ReviewsStore = {
  reviews: IReviews[];
  isLoading: boolean;
  error: null | string;
  fetchReviews: (id: number) => Promise<void>;
};

const useReviewsStore = create<ReviewsStore>((set) => ({
  reviews: [],
  isLoading: false,
  error: null,
  fetchReviews: async (id: number) => {
    set({ isLoading: false, error: null });
    try {
      const response = await axios.get<{ data: IReviews[] }>(
        `https://api.jikan.moe/v4/anime/${id}/reviews`
      );
      set({ reviews: response.data.data, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.message || 'Reviews fetch error' });
      } else {
        set({ error: 'Unknown error!' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useReviewsStore;
