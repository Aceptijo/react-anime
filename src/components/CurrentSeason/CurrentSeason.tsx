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
  }, []);

  return (
    <Carousel
      className="w-full flex flex-col justify-start"
      opts={{
        align: 'start',
      }}
    >
      <span className="flex pt-5 pb-5 text-gray-200">{'Winter 2025 Anime'}</span>
      <CarouselContent>
        {seasonAnime.map((seasonItem) => (
          <CarouselItem key={seasonItem.mal_id} className="w-1/6 max-h-72 basis-auto">
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
