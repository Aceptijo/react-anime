export type IAnimeById = {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    url: string;
    embed_url: string;
  };
  title_english: string;
  synopsis: string;
  type: string;
  episodes: number;
  status: string;
  aired: {
    string: string;
  };
  duration: string;
  rating: string;
  source: string;
  genres: {
    mal_id: number;
    name: string;
  }[];
  season: string;
  year: number;
  score: number;
  scored_by: number;
};
