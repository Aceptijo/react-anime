import { useEffect } from 'react';
import useCurrentSeasonStore from '@/store/CurrentSeasonStore.ts';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

const Header = () => {
  const { seasonAnime, fetchSeasonAnime } = useCurrentSeasonStore();

  useEffect(() => {
    fetchSeasonAnime();
  }, [fetchSeasonAnime]);

  return (
    <div className="flex h-screen items-center justify-between">
      <div className="flex basis-1/2 flex-col items-start gap-5">
        <span className="text-left text-5xl text-white">
          {`${seasonAnime[0]?.title_english}`}
        </span>
        <div className="flex gap-2">
          <Badge className="text-1xl bg-myDarkGray text-myYellow hover:bg-myDarkGray">
            {`${seasonAnime[0]?.score}`}
          </Badge>
          <Badge className="text-1xl bg-myDarkGray text-myGray hover:bg-myDarkGray">
            {`${seasonAnime[0]?.year}`}
          </Badge>
          <Badge variant="outline" className="text-1xl border-myRed text-myRed">
            {`${seasonAnime[0]?.rating?.trim().slice(0, 6)}`}
          </Badge>
          <Badge
            variant="outline"
            className="text-1xl border-myGreen text-myGreen"
          >
            {`${seasonAnime[0]?.status ? 'Airing' : 'Aired'}`}
          </Badge>
          <Badge className="text-1xl bg-background text-myGray hover:bg-background">
            {`Ep: ${seasonAnime[0]?.episodes}`}
          </Badge>
        </div>
        <span className="text-left text-myGray">{`${seasonAnime[0]?.synopsis}`}</span>
        <div className="flex gap-3">
          <Button className="rounded-3xl bg-myGreen hover:bg-myHoverGreen">
            <PlayArrowIcon />
            <span>Watch now</span>
          </Button>
          <Button className="hover:bg-myHoverGray rounded-3xl bg-myDarkGray">
            <BookmarkAddOutlinedIcon />
            <span>Add to favorite</span>
          </Button>
        </div>
      </div>
      <div className="flex basis-1/2 items-center justify-end">
        <img
          src={`${seasonAnime[0]?.images.jpg.large_image_url}`}
          alt=""
          className="rounded-3xl"
        />
      </div>
    </div>
  );
};

export default Header;
