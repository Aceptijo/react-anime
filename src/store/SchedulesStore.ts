import { create } from 'zustand';
import axios from 'axios';
import { IAnimeById } from '@/models/AnimeById.ts';

type SchedulesStore = {
  scheduledAnime: IAnimeById[];
  isLoading: boolean;
  error: null | string;
  fetchAnimeSchedule: (day: string) => Promise<void>;
};

const useSchedulesStore = create<SchedulesStore>((set) => ({
  scheduledAnime: [],
  isLoading: false,
  error: null,
  fetchAnimeSchedule: async (day: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<{
        data: IAnimeById[];
      }>(`https://api.jikan.moe/v4/schedules?filter=${day}`);
      const uniqueAnime = Array.from(
        new Set(response.data.data.map((anime) => JSON.stringify(anime)))
      ).map((anime) => JSON.parse(anime));
      set({ scheduledAnime: uniqueAnime, isLoading: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || err.message || 'Schedule error' });
      } else {
        set({ error: 'Unknown error!' });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSchedulesStore;
