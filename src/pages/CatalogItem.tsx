import { useParams } from 'react-router-dom';
import useAnimeByIdStore from '@/store/AnimeByIdStore.ts';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';

const CatalogItem = () => {
  const { id } = useParams();
  const { fetchById, fetchedAnime } = useAnimeByIdStore();
  const [selectedValue, setSelectedValue] = useState<string>('');

  useEffect(() => {
    fetchById(Number(id));
  }, [id]);

  return (
    <div className="mt-20 flex w-full gap-5">
      <div className="flex flex-col gap-3">
        <img
          className="max-w-fit rounded-xl"
          src={`${fetchedAnime?.images.jpg.image_url}`}
          alt={`${fetchedAnime?.title_english}`}
        />
        <TooltipProvider>
          <ToggleGroup
            type="single"
            value={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
            size="lg"
            className="flex w-full justify-between"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ToggleGroupItem
                    value="favourites"
                    aria-label="Favourites"
                    className="bg-primary hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-destructive"
                  >
                    <FavoriteRoundedIcon />
                  </ToggleGroupItem>
                </div>
              </TooltipTrigger>
              <TooltipContent>Favourites</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ToggleGroupItem
                    value="watching"
                    aria-label="Watching"
                    className="bg-primary hover:bg-accent hover:text-secondary-foreground data-[state=on]:bg-secondary"
                  >
                    <VisibilityIcon />
                  </ToggleGroupItem>
                </div>
              </TooltipTrigger>
              <TooltipContent>Watching</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ToggleGroupItem
                    value="planned"
                    aria-label="Planned"
                    className="bg-primary hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-secondary"
                  >
                    <WatchLaterIcon />
                  </ToggleGroupItem>
                </div>
              </TooltipTrigger>
              <TooltipContent>Planned</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ToggleGroupItem
                    value="dropped"
                    aria-label="Dropped"
                    className="bg-primary hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-gray-400"
                  >
                    <DeleteIcon />
                  </ToggleGroupItem>
                </div>
              </TooltipTrigger>
              <TooltipContent>Dropped</TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </TooltipProvider>
        <div className="flex flex-col items-start gap-2 rounded-xl bg-secondaryBg p-4 text-left">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Type</span>
            <span>{fetchedAnime?.type}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Source</span>
            <span>{fetchedAnime?.source}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Episodes</span>
            <span>{`${fetchedAnime?.episodes}   (${fetchedAnime?.duration})`}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Aired</span>
            <span>{fetchedAnime?.aired.string}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="outline" className="border-secondary text-secondary">
              {fetchedAnime?.status}
            </Badge>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Rating</span>
            <Badge variant="outline" className="border-destructive font-medium text-destructive">
              {fetchedAnime?.rating}
            </Badge>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Rating</span>
            <div className="flex flex-wrap gap-1">
              {fetchedAnime?.genres.map((genre) => (
                <Badge className="font-medium" key={genre.mal_id}>
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="pt-5 text-left text-2xl font-bold">{fetchedAnime?.title_english}</h1>
          <div className="flex items-center text-myYellow">
            <StarRoundedIcon />
            <h1 className="mr-4 text-2xl font-medium">{fetchedAnime?.score}</h1>
            <span className="text-2xl text-muted-foreground">{`${Math.ceil(fetchedAnime?.scored_by ?? 0)}`}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl bg-secondaryBg p-4 text-left">
          <h1 className="text-lg font-medium text-secondary-foreground">Description</h1>
          <p>{fetchedAnime?.synopsis}</p>
        </div>
        <div className="flex flex-col gap-5 rounded-xl bg-secondaryBg p-4 text-left">
          <h1 className="text-lg font-medium text-secondary-foreground">Episodes</h1>
          <div className="flex h-36 gap-5">
            <div className="basis-1/4 overflow-hidden rounded-xl bg-primary">
              <img src={`${fetchedAnime?.images.jpg.image_url}`} className="w-full" alt="asd" />
            </div>
            <div className="basis-1/4 overflow-hidden rounded-xl bg-primary">
              <img src={`${fetchedAnime?.images.jpg.image_url}`} className="w-full" alt="asdasd" />
            </div>
            <div className="basis-1/4 overflow-hidden rounded-xl bg-primary">
              <img src={`${fetchedAnime?.images.jpg.image_url}`} className="w-full" alt="asdasd" />
            </div>
            <div className="basis-1/4 overflow-hidden rounded-xl bg-primary">
              <img src={`${fetchedAnime?.images.jpg.image_url}`} className="w-full" alt="asdas" />
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-5 rounded-xl bg-secondaryBg p-4">
          <iframe
            src={`${fetchedAnime?.trailer.embed_url}`}
            height="615"
            className="w-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
