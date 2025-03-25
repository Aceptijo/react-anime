import { IStatistics } from '@/models/Statistics.ts';
import { IAnimeById } from '@/models/AnimeById.ts';
import { STATISTICS_CHART_CONFIG } from '@/components/CatalogItem/statisticsConfig.ts';

export const getStatisticsChartData = (
  statistics: IStatistics | null,
  fetchedAnime: IAnimeById | null
) => [
  {
    statistic: 'favorites',
    users: fetchedAnime?.favorites,
    fill: STATISTICS_CHART_CONFIG.favorites.color,
  },
  {
    statistic: 'watching',
    users: statistics?.watching,
    fill: STATISTICS_CHART_CONFIG.watching.color,
  },
  {
    statistic: 'planned',
    users: statistics?.plan_to_watch,
    fill: STATISTICS_CHART_CONFIG.planned.color,
  },
  {
    statistic: 'dropped',
    users: statistics?.dropped,
    fill: STATISTICS_CHART_CONFIG.dropped.color,
  },
];
