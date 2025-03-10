import useRecommendationsStore from '@/store/RecommendationsStore.ts';
import { useEffect } from 'react';
import AnimeCard from '@/components/AnimeCard/AnimeCard.tsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const Recommendations = () => {
  const { anime, isLoading, fetchRecommendations } = useRecommendationsStore();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-1/5 bg-secondaryBg" />
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton className="h-[360px] w-1/5 bg-secondaryBg" key={index} />
            ))}
          </div>
        </div>
      ) : (
        <Carousel
          className="flex flex-col justify-start"
          opts={{
            align: 'start',
          }}
        >
          <span className="flex py-5 text-xl font-bold">Recommended</span>
          <CarouselContent>
            {anime.map((item) => (
              <CarouselItem key={item.mal_id} className="w-1/5 basis-1/5">
                <AnimeCard anime={item} />
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

export default Recommendations;
