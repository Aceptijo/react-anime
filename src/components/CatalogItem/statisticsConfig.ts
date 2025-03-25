export const STATISTICS_CHART_CONFIG = {
  favorites: {
    label: 'Favorites',
    color: 'hsl(var(--chart-1))',
  },
  watching: {
    label: 'Watching',
    color: 'hsl(var(--chart-2))',
  },
  planned: {
    label: 'Planned',
    color: 'hsl(var(--chart-3))',
  },
  dropped: {
    label: 'Dropped',
    color: 'hsl(var(--chart-4))',
  },
} as const;
