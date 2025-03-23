import useCurrentSeasonStore from '@/store/currentSeasonStore.ts';
import { useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import AnimeCard from '@/components/AnimeCard/AnimeCard.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const CurrentSeason = () => {
  const { seasonAnime, isLoading, fetchSeasonAnime } = useCurrentSeasonStore();

  useEffect(() => {
    fetchSeasonAnime();
  }, [fetchSeasonAnime]);

  const formatLiteral = () => {
    return seasonAnime[0]?.season.charAt(0).toUpperCase() + seasonAnime[0]?.season.slice(1);
  };

  return (
    <>
      {isLoading ? (
        <div className="mt-20 flex flex-col gap-3">
          <Skeleton className="h-10 w-1/5 bg-secondaryBg" />
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton className="h-[360px] w-1/5 bg-secondaryBg" key={index} />
            ))}
          </div>
        </div>
      ) : (
        <Carousel
          className="mt-10 flex flex-col justify-start"
          opts={{
            align: 'start',
          }}
        >
          <span className="flex pb-5 pt-5 text-lg text-white font-montserrat font-bold">
            {`${formatLiteral()} ${seasonAnime[0]?.year} Anime`}
          </span>
          <CarouselContent>
            {seasonAnime.map((seasonItem) => (
              <CarouselItem key={seasonItem.mal_id} className="w-1/5 basis-1/5">
                <AnimeCard anime={seasonItem} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="ghost" />
          <CarouselNext variant="ghost" />
        </Carousel>
      )}
    </>
  );
};

export default CurrentSeason;
