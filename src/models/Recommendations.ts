export type IRecommendations = {
  mal_id: number;
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
      };
    };
    title: string;
    title_english?: string;
    score?: number;
    episodes?: number;
    genres?: {
      name: string;
    }[];
    rating: string;
  }[];
  content: string;
  user: {
    url: string;
    username: string;
  };
};
