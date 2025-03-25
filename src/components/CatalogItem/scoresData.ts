import { IStatistics } from '@/models/Statistics.ts';
import { SCORES_CHART_CONFIG } from '@/components/CatalogItem/scoresConfig.ts';

export const getScoresChartData = (statistics: IStatistics | null) => [
  {
    score: 1,
    votes: statistics?.scores[0].votes,
    fill: SCORES_CHART_CONFIG.one.color,
  },
  {
    score: 2,
    votes: statistics?.scores[1].votes,
    fill: SCORES_CHART_CONFIG.two.color,
  },
  {
    score: 3,
    votes: statistics?.scores[2].votes,
    fill: SCORES_CHART_CONFIG.three.color,
  },
  {
    score: 4,
    votes: statistics?.scores[3].votes,
    fill: SCORES_CHART_CONFIG.four.color,
  },
  {
    score: 5,
    votes: statistics?.scores[4].votes,
    fill: SCORES_CHART_CONFIG.five.color,
  },
  {
    score: 6,
    votes: statistics?.scores[5].votes,
    fill: SCORES_CHART_CONFIG.six.color,
  },
  {
    score: 7,
    votes: statistics?.scores[6].votes,
    fill: SCORES_CHART_CONFIG.seven.color,
  },
  {
    score: 8,
    votes: statistics?.scores[7].votes,
    fill: SCORES_CHART_CONFIG.eight.color,
  },
  {
    score: 9,
    votes: statistics?.scores[8].votes,
    fill: SCORES_CHART_CONFIG.nine.color,
  },
  {
    score: 10,
    votes: statistics?.scores[9].votes,
    fill: SCORES_CHART_CONFIG.ten.color,
  },
];
