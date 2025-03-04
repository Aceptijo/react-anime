import { FC } from 'react';
import { IRecommendations } from '@/models/Recommendations.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { ICurrentSeason } from '@/models/CurrentSeason.ts';
import { Link } from 'react-router-dom';
import { ITopAnime } from '@/models/TopAnime.ts';

type AnimeCardProps = {
  anime: IRecommendations | ICurrentSeason | ITopAnime;
};

const AnimeCard: FC<AnimeCardProps> = ({ anime }) => {
  const isRecommendations = 'entry' in anime;
  const animeData = isRecommendations ? anime.entry[0] : anime;

  return (
    <Card className="group relative h-[360px] cursor-pointer overflow-hidden border-none">
      <Link to={`/catalog/item/${animeData.mal_id}`}>
        <CardContent className="flex h-full items-center justify-center p-0">
          <img
            className="h-full w-full cursor-pointer"
            src={animeData.images.jpg.large_image_url}
            alt={animeData.title_english || animeData.title}
          />
          <div className="absolute h-full w-full bg-primary text-white opacity-0 transition-opacity duration-300 group-hover:opacity-80">
            <div className="flex flex-col items-center gap-5 text-wrap break-words p-4">
              <span className="text-xl font-bold">
                {animeData.title_english || animeData.title}
              </span>
              <span className="line-clamp-6 break-words">
                {isRecommendations ? anime.content : anime.synopsis}
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default AnimeCard;
