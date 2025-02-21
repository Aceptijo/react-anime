import { useEffect } from 'react';
import useCurrentSeasonStore from '@/store/CurrentSeasonStore.ts';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const Header = () => {
  const { seasonAnime, fetchSeasonAnime } = useCurrentSeasonStore();

  useEffect(() => {
    fetchSeasonAnime();
  }, [fetchSeasonAnime]);

  const selectRating = () => {
    return seasonAnime[0]?.rating.includes('17') ? 'R - 17+' : 'PG - 13';
  };

  return (
    <div className="flex h-screen items-center justify-between">
      <div className="flex basis-1/2 flex-col items-start gap-5">
        <h1 className="text-left text-5xl text-white">{`${seasonAnime[0]?.title_english}`}</h1>
        <div className="flex gap-2">
          <Badge className="text-1xl cursor-pointer gap-2 text-myYellow">
            <StarRoundedIcon />
            {`${seasonAnime[0]?.score}`}
          </Badge>
          <Badge className="text-1xl cursor-pointer">{`${seasonAnime[0]?.year}`}</Badge>
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
            {`${seasonAnime[0]?.status ? 'Airing' : 'Aired'}`}
          </Badge>
          <Badge className="text-1xl cursor-pointer bg-background hover:bg-background">
            {`Ep: ${seasonAnime[0]?.episodes}`}
          </Badge>
        </div>
        <p className="text-left">{`${seasonAnime[0]?.synopsis}`}</p>
        <div className="flex gap-3">
          <Button className="hover:bg-secondary-hover text-1xl bg-secondary text-secondary-foreground">
            <PlayArrowIcon />
            <span>Watch now</span>
          </Button>
          <Button className="text-1xl bg-primary hover:bg-accent hover:text-accent-foreground">
            <BookmarkAddOutlinedIcon />
            <span>Add to favorite</span>
          </Button>
        </div>
      </div>
      <div className="flex basis-1/2 items-center justify-end">
        <img src={`${seasonAnime[0]?.images.jpg.large_image_url}`} alt="" className="rounded-3xl" />
      </div>
    </div>
  );
};

export default Header;
