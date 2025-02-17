export type ICurrentSeason = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
    };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  approved: boolean;
  title_english: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  season: string;
  year: number;
};
