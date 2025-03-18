import useCurrentSeasonStore from '@/store/CurrentSeasonStore.ts';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Bookmark, Play, Star } from 'lucide-react';

const MainSlider = () => {
  const { seasonAnime, isLoading } = useCurrentSeasonStore();

  const selectRating = () => {
    return seasonAnime[0]?.rating.includes('PG-13')
      ? 'PG-13'
      : seasonAnime[0].rating.slice(0, seasonAnime[0].rating.indexOf('-'));
  };

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-between gap-3">
          <div className="flex basis-1/2 flex-col gap-3">
            <Skeleton className="h-10 rounded-xl bg-secondaryBg" />
            <Skeleton className="h-[250px] rounded-xl bg-secondaryBg" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-[150px] rounded-xl bg-secondaryBg" />
              <Skeleton className="h-10 w-[150px] rounded-xl bg-secondaryBg" />
            </div>
          </div>
          <div className="flex basis-1/2 justify-end">
            <Skeleton className="h-[600px] w-[425px] rounded-xl bg-secondaryBg" />
          </div>
        </div>
      ) : (
        <Carousel opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 5000 })]}>
          <CarouselContent>
            {seasonAnime.map((anime) => (
              <CarouselItem
                key={anime.mal_id}
                className="flex h-screen items-center justify-between"
              >
                <div className="flex basis-1/2 flex-col items-start gap-5">
                  <h1 className="text-left text-4xl text-white font-medium">
                    {anime.title_english}
                  </h1>
                  <div className="flex gap-2 items-center ">
                    <Badge className="text-sm cursor-pointer gap-2 py-1 text-myYellow">
                      <Star className="fill-myYellow w-5 h-5" />
                      {anime.score || 'No rating yet'}
                    </Badge>
                    <Badge className="text-sm cursor-pointer py-1">{anime.year || 'Unknown'}</Badge>
                    <Badge
                      variant="outline"
                      className="text-sm py-1 cursor-pointer border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      {selectRating()}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm py-1 cursor-pointer border-secondary text-secondary hover:bg-secondary hover:text-white"
                    >
                      {`${anime.status}`}
                    </Badge>
                    <Badge className=" text-sm py-1 cursor-pointer bg-background hover:bg-background">
                      {`Ep: ${anime.episodes}`}
                    </Badge>
                  </div>
                  <p className="text-left">
                    {anime.synopsis || 'The anime does not have a description yet.'}
                  </p>
                  <div className="flex gap-3">
                    <Link to={`/catalog/item/${anime.mal_id}`}>
                      <Button className="bg-secondary text-sm text-secondary-foreground hover:bg-secondary-hover">
                        <Play className="fill-white" />
                        {'Watch now'}
                      </Button>
                    </Link>
                    <Button
                      className="text-sm bg-primary hover:bg-accent hover:text-accent-foreground"
                      onClick={() => toast.success('Added to favorites!')}
                    >
                      <Bookmark className="fill-foreground stroke-foreground" />
                      <span>Add to favorites</span>
                    </Button>
                  </div>
                </div>
                <div className="flex basis-1/2 items-center justify-end">
                  <img
                    src={`${anime.images.jpg.large_image_url}`}
                    alt={`${anime.title_english}`}
                    className="rounded-3xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </>
  );
};

export default MainSlider;
