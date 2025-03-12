import { FC } from 'react';
import { IRecommendations } from '@/models/Recommendations.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { ICurrentSeason } from '@/models/CurrentSeason.ts';
import { Link } from 'react-router-dom';
import { ITopAnime } from '@/models/TopAnime.ts';
import { Badge } from '@/components/ui/badge.tsx';
import { Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

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
            className="h-full w-full cursor-pointer object-cover"
            src={animeData.images.jpg.large_image_url}
            alt={animeData.title_english || animeData.title}
          />
          <div className="absolute h-full w-full bg-primary text-white opacity-0 transition-opacity duration-300 group-hover:opacity-90">
            <div className="flex flex-col h-full justify-between items-center gap-5 text-wrap break-words p-4">
              {isRecommendations ? (
                <div className="flex flex-col justify-center h-full gap-5 text-wrap break-words">
                  <span className="text-xl font-bold">{animeData.title}</span>
                  <span className="line-clamp-6 break-words">{anime.content}</span>
                </div>
              ) : (
                <>
                  <Badge className="bg-accent px-3 py-2 rounded-xl text-sm text-white">{`${animeData.episodes || '???'} Episodes`}</Badge>
                  <span className="text-xl font-bold">
                    {animeData.title_english || animeData.title}
                  </span>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {animeData.genres?.map((genre) => (
                      <span className="text-sm text-foreground" key={genre.name}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-foreground">
                      {animeData.rating?.includes('17') ? 'R-17+' : 'PG-13'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-white" />
                      <span className="text-sm text-foreground">
                        {animeData.score || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </>
              )}
              <Button className="bg-accent rounded-xl text-white ">
                <Play className="fill-white stroke-white" />
                {'Watch now'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default AnimeCard;
