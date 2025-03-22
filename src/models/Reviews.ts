export type IReviews = {
  mal_id: number;
  url: string;
  type: string;
  date: string;
  review: string;
  score: number;
  tags: string[];
  user: {
    url: string;
    username: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
};
