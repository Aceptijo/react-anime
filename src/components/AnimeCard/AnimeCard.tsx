import { FC } from 'react';
import { IRecommendations } from '@/models/Recommendations.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { ICurrentSeason } from '@/models/CurrentSeason.ts';
import { Link } from 'react-router-dom';
import { ITopAnime } from '@/models/TopAnime.ts';
import { Button } from '@/components/ui/button.tsx';
import { FaPlay, FaStar, FaSpinner } from 'react-icons/fa6';

type AnimeCardProps = {
  anime: IRecommendations | ICurrentSeason | ITopAnime;
};

const AnimeCard: FC<AnimeCardProps> = ({ anime }) => {
  const isRecommendations = 'entry' in anime;
  const animeData = isRecommendations ? anime.entry[0] : anime;

  return (
    <Card className="group relative h-[360px] cursor-pointer rounded-md overflow-hidden border-none">
      <Link to={`/catalog/item/${animeData.mal_id}`}>
        <CardContent className="flex h-full items-center justify-center p-0">
          <img
            className="h-full w-full cursor-pointer object-cover rounded-lg overflow-hidden"
            src={animeData.images.jpg.large_image_url}
            alt={animeData.title_english || animeData.title}
          />
          <div className="absolute h-full w-full bg-secondaryBg text-white opacity-0 transition-opacity duration-200 group-hover:opacity-95">
            <div className="flex flex-col h-full justify-between items-center gap-5 text-wrap break-words p-4">
              {isRecommendations ? (
                <div className="flex flex-col justify-center h-full gap-5 text-wrap break-words">
                  <span className="text-lg text-white font-bold line-clamp-3">
                    {animeData.title}
                  </span>
                  <span className="line-clamp-6 text-xs text-muted  break-words">
                    {anime.content}
                  </span>
                </div>
              ) : (
                <>
                  <Button className="bg-primary px-3 py-2 rounded-xl text-xs text-white hover:bg-accent">
                    {animeData.episodes ? (
                      <span>{`${animeData.episodes} episodes`}</span>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <FaSpinner />
                        <span>episodes</span>
                      </div>
                    )}
                  </Button>
                  <span className="text-base font-bold text-white font-montserrat opacity-1 line-clamp-5 break-all">
                    {animeData.title_english || animeData.title}
                  </span>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {animeData.genres?.map((genre) => (
                      <span className="text-xs text-foreground" key={genre.name}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 text-xs text-muted">
                    <span>{animeData.year}</span>
                    <span>{animeData.type}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-muted">
                      {animeData.rating?.includes('PG-13')
                        ? 'PG-13'
                        : animeData.rating?.slice(0, animeData.rating?.indexOf(' - '))}
                    </span>
                    <div className="flex items-center text-muted gap-1">
                      <FaStar className="!size-3" />
                      <span className="text-xs ">{animeData.score || 'Unknown'}</span>
                    </div>
                  </div>
                </>
              )}
              <Button className="bg-primary rounded-xl text-xs text-white">
                <FaPlay className="!size-3" />
                <span>Watch now</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default AnimeCard;
