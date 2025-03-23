export type ITopAnime = {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  synopsis: string;
  episodes: number;
  genres: {
    name: string;
  }[];
  score: number;
  rating: string;
  type: string;
  year: number;
};
