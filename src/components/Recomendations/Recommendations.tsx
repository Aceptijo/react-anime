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

const Recommendations = () => {
  const { anime, fetchRecommendations } = useRecommendationsStore();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <Carousel
      className="flex w-full flex-col justify-start"
      opts={{
        align: 'start',
      }}
    >
      <span className="flex pb-5 pt-5 text-xl text-gray-200">Recommended</span>
      <CarouselContent>
        {anime.map((item) => (
          <CarouselItem key={item.mal_id} className="w-1/5 basis-auto">
            <AnimeCard anime={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="ghost" />
      <CarouselNext variant="ghost" />
    </Carousel>
  );
};

export default Recommendations;
