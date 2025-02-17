import { FC } from 'react';
import { IRecommendations } from '@/models/Recommendations.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { ICurrentSeason } from '@/models/CurrentSeason.ts';

type AnimeCardProps = {
  anime: IRecommendations | ICurrentSeason;
};

const AnimeCard: FC<AnimeCardProps> = ({ anime }) => {
  if ('entry' in anime) {
    return (
      <Card className="max-w-52 h-full overflow-hidden">
        <CardContent className="flex items-center justify-center p-0 h-full">
          <img
            className="w-full max-h-72 h-full"
            src={anime.entry[0].images.jpg.image_url}
            alt={anime.entry[0].title}
          />
        </CardContent>
      </Card>
    );
  }

  if ('season' in anime) {
    return (
      <Card className="max-w-52 h-full overflow-hidden">
        <CardContent className="flex items-center justify-center p-0 h-full">
          <img
            className="w-full max-h-72 h-full"
            src={anime.images.jpg.image_url || 'asd'}
            alt={anime.title_english}
          />
        </CardContent>
      </Card>
    );
  }
};

export default AnimeCard;
