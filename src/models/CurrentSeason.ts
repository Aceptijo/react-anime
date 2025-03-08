export type ICurrentSeason = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
    };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      maximum_image_url: string;
    };
  };
  genres: {
    name: string;
  }[];
  approved: boolean;
  title: string;
  title_english: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  season: string;
  year: number;
  synopsis: string;
  score: number;
  rating: string;
  rank: number;
  background: string;
};
