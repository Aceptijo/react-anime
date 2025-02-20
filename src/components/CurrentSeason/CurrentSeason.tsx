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

  return (
    <Carousel
      className="flex w-full flex-col justify-start"
      opts={{
        align: 'start',
      }}
    >
      <span className="text-1xl flex pb-5 pt-5 text-gray-200">
        {`${seasonAnime[0]?.season.toUpperCase()} ${seasonAnime[0]?.year} Anime`}
      </span>
      <CarouselContent>
        {seasonAnime.map((seasonItem) => (
          <CarouselItem
            key={seasonItem.mal_id}
            className="max-h-72 w-1/6 basis-auto"
          >
            <AnimeCard anime={seasonItem} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CurrentSeason;
