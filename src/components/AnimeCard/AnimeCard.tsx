import { FC } from 'react';
import { IRecommendations } from '@/models/Recommendations.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { ICurrentSeason } from '@/models/CurrentSeason.ts';
import { Link } from 'react-router-dom';

type AnimeCardProps = {
  anime: IRecommendations | ICurrentSeason;
};

const AnimeCard: FC<AnimeCardProps> = ({ anime }) => {
  if ('entry' in anime) {
    return (
      <Card className="group relative h-full cursor-pointer overflow-hidden">
        <Link to={`/catalog/item/${anime.entry[0].title}`}>
          <CardContent className="flex h-full items-center justify-center p-0">
            <img
              className="h-full w-full cursor-pointer"
              src={anime.entry[0].images.jpg.large_image_url}
              alt={anime.entry[0].title}
            />
            <div className="transition-opacity: absolute h-full w-full bg-primary text-white opacity-0 duration-200 group-hover:opacity-80">
              <div className="flex flex-col items-center gap-5 text-wrap break-words p-4">
                <span className="text-xl font-bold">{anime.entry[0].title}</span>
                <span className="line-clamp-6">{anime.content}</span>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  if ('season' in anime) {
    return (
      <Card className="group relative h-full cursor-pointer overflow-hidden">
        <Link to={`/catalog/item/${anime.title_english}`}>
          <CardContent className="flex h-full items-center justify-center p-0">
            <img
              className="h-full w-full cursor-pointer"
              src={anime.images.jpg.large_image_url || 'asd'}
              alt={anime.title_english}
            />
            <div className="absolute h-full w-full bg-primary text-white opacity-0 transition-opacity duration-300 group-hover:opacity-80">
              <div className="flex flex-col items-center gap-5 text-wrap break-words p-4">
                <span className="text-xl font-bold">{anime.title_english}</span>
                <span className="line-clamp-6">{anime.synopsis}</span>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }
};

export default AnimeCard;
