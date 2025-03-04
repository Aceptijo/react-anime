import useCurrentSeasonStore from '@/store/CurrentSeasonStore.ts';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const MainSlider = () => {
  const { seasonAnime, isLoading } = useCurrentSeasonStore();

  const selectRating = () => {
    return seasonAnime[0]?.rating.includes('17') ? 'R - 17+' : 'PG - 13';
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
                  <h1 className="text-left text-5xl text-white">{anime.title_english}</h1>
                  <div className="flex gap-2">
                    <Badge className="text-1xl cursor-pointer gap-2 text-myYellow">
                      <StarRoundedIcon />
                      {anime.score || 'No rating yet'}
                    </Badge>
                    <Badge className="text-1xl cursor-pointer">{anime.year || 'Unknown'}</Badge>
                    <Badge
                      variant="outline"
                      className="text-1xl cursor-pointer border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      {selectRating()}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-1xl cursor-pointer border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      {`${anime.status}`}
                    </Badge>
                    <Badge className="text-1xl cursor-pointer bg-background hover:bg-background">
                      {`Ep: ${anime.episodes}`}
                    </Badge>
                  </div>
                  <p className="text-left">
                    {anime.synopsis || 'The anime does not have a description yet.'}
                  </p>
                  <div className="flex gap-3">
                    <Button className="text-1xl bg-secondary text-secondary-foreground hover:bg-secondary-hover">
                      <PlayArrowIcon />
                      <Link to={`/catalog/item/${anime.mal_id}`}>Watch now</Link>
                    </Button>
                    <Button
                      className="text-1xl bg-primary hover:bg-accent hover:text-accent-foreground"
                      onClick={() => toast.success('Added to favorites!')}
                    >
                      <BookmarkAddOutlinedIcon />
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
