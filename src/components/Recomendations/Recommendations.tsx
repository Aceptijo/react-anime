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
      className="w-full flex flex-col justify-start"
      opts={{
        align: 'start',
      }}
    >
      <span className="flex pt-5 pb-5 text-gray-200">Recommended</span>
      <CarouselContent>
        {anime.map((item) => (
          <CarouselItem key={item.mal_id} className="w-1/6 max-h-72 basis-auto">
            <AnimeCard anime={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Recommendations;
