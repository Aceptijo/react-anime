import useCurrentSeasonStore from '@/store/CurrentSeasonStore.ts';
import { useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import AnimeCard from '@/components/AnimeCard/AnimeCard.tsx';

const CurrentSeason = () => {
  const { seasonAnime, fetchSeasonAnime } = useCurrentSeasonStore();

  useEffect(() => {
    fetchSeasonAnime();
  }, [fetchSeasonAnime]);

  const formatLiteral = () => {
    return seasonAnime[0]?.season.charAt(0).toUpperCase() + seasonAnime[0]?.season.slice(1);
  };

  return (
    <Carousel
      className="mt-10 flex w-full flex-col justify-start"
      opts={{
        align: 'start',
      }}
    >
      <span className="flex pb-5 pt-5 text-xl text-gray-200">
        {`${formatLiteral()} ${seasonAnime[0]?.year} Anime`}
      </span>
      <CarouselContent>
        {seasonAnime.map((seasonItem) => (
          <CarouselItem key={seasonItem.mal_id} className="w-1/5 basis-auto">
            <AnimeCard anime={seasonItem} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="ghost" />
      <CarouselNext variant="ghost" />
    </Carousel>
  );
};

export default CurrentSeason;
