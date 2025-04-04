import useCurrentSeasonStore from '@/store/currentSeasonStore.ts';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { FaBookmark, FaStar, FaPlay } from 'react-icons/fa6';

const MainSlider = () => {
  const { seasonAnime, isLoading } = useCurrentSeasonStore();

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
                  <h1 className="text-left text-3xl text-white font-bold font-montserrat">
                    {anime.title_english}
                  </h1>
                  <div className="flex gap-2 items-center ">
                    <Badge className="cursor-pointer gap-2 text-myYellow">
                      <FaStar className="size-3" />
                      {anime.score || 'Unknown'}
                    </Badge>
                    <Badge className="cursor-pointer ">{anime.year || 'Unknown'}</Badge>
                    <Badge className="cursor-pointer">{`Ep: ${anime.episodes || '-'}`}</Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-secondary text-secondary hover:bg-secondary hover:text-white"
                    >
                      {`${anime.status}`}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      {anime.rating || 'Unknown'}
                    </Badge>
                  </div>
                  <p className="text-left text-sm">
                    {anime.synopsis || 'The anime does not have a description yet.'}
                  </p>
                  <div className="flex gap-3">
                    <Link to={`/catalog/item/${anime.mal_id}`}>
                      <Button variant="secondary">
                        <FaPlay className="!size-3" />
                        <span>Watch now</span>
                      </Button>
                    </Link>
                    <Button onClick={() => toast.success('Added to favorites!')}>
                      <FaBookmark className="!size-3" />
                      <span>Add to favorites</span>
                    </Button>
                  </div>
                </div>
                <div className="flex basis-1/2 items-center justify-end">
                  <img
                    src={`${anime.images.jpg.large_image_url}`}
                    alt={`${anime.title_english}`}
                    className="rounded-lg"
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
