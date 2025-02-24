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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import useStatisticsStore from '@/store/StatisticsStore.ts';

const CatalogItem = () => {
  const { id } = useParams();
  const { fetchById, fetchedAnime } = useAnimeByIdStore();
  const { statistics, fetchStatistics } = useStatisticsStore();
  const [selectedValue, setSelectedValue] = useState<string>('');

  useEffect(() => {
    fetchById(Number(id));
    fetchStatistics(Number(id));
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
                <div className="flex-1">
                  <ToggleGroupItem
                    value="favourites"
                    aria-label="Favourites"
                    className="w-full bg-primary hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-destructive"
                  >
                    <FavoriteRoundedIcon />
                  </ToggleGroupItem>
                </div>
              </TooltipTrigger>
              <TooltipContent>Favourites</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-1">
                  <ToggleGroupItem
                    value="watching"
                    aria-label="Watching"
                    className="w-full bg-primary hover:bg-accent hover:text-secondary-foreground data-[state=on]:bg-secondary"
                  >
                    <VisibilityIcon />
                  </ToggleGroupItem>
                </div>
              </TooltipTrigger>
              <TooltipContent>Watching</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-1">
                  <ToggleGroupItem
                    value="planned"
                    aria-label="Planned"
                    className="w-full bg-primary hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-secondary"
                  >
                    <WatchLaterIcon />
                  </ToggleGroupItem>
                </div>
              </TooltipTrigger>
              <TooltipContent>Planned</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-1">
                  <ToggleGroupItem
                    value="dropped"
                    aria-label="Dropped"
                    className="w-full bg-primary hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-gray-400"
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
            <span className="text-sm font-medium text-muted-foreground">Type</span>
            <span>{fetchedAnime?.type}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Source</span>
            <span>{fetchedAnime?.source}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Episodes</span>
            <div className="flex gap-3">
              <span>{fetchedAnime?.episodes}</span>
              <span className="text-muted-foreground">{fetchedAnime?.duration}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Aired</span>
            <span>{fetchedAnime?.aired.string}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Studios</span>
            <span>{fetchedAnime?.studios[0].name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Status</span>
            <Badge variant="outline" className="border-secondary text-secondary">
              {fetchedAnime?.status}
            </Badge>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Rating</span>
            <Badge variant="outline" className="border-destructive font-medium text-destructive">
              {fetchedAnime?.rating}
            </Badge>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Genres</span>
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
          <h1 className="pt-5 text-left text-2xl font-bold text-secondary-foreground">
            {fetchedAnime?.title_english}
          </h1>
          <div className="mt-5 flex items-center text-myYellow">
            <StarRoundedIcon />
            <h1 className="mr-4 text-2xl font-medium">{fetchedAnime?.score}</h1>
            <span className="text-xl text-muted-foreground">{`${fetchedAnime?.scored_by ?? 0} users`}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl bg-secondaryBg text-left">
          <Tabs defaultValue="description">
            <TabsList className="bg-secondaryBg px-4 py-9">
              <TabsTrigger
                value="description"
                className="border border-secondaryBg px-10 py-3 text-lg data-[state=active]:border-secondary data-[state=active]:bg-secondary-hover"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                className="border border-secondaryBg px-10 py-3 text-lg data-[state=active]:border-secondary data-[state=active]:bg-secondary-hover"
              >
                Statistics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="px-4 pb-4">
              <p>{fetchedAnime?.synopsis}</p>
            </TabsContent>
            <TabsContent value="statistics" className="px-4 pb-4">
              <div className="flex gap-10">
                <div className="flex basis-1/2 gap-10">
                  <div className="flex flex-col gap-3 font-medium">
                    <span>{`Score:`}</span>
                    <span>{`Score by:`}</span>
                    <span>{`Rank:`}</span>
                    <span>{`Popularity:`}</span>
                    <span>{`Members:`}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-myYellow">{fetchedAnime?.score}</span>
                    <span>{`${fetchedAnime?.scored_by} users`}</span>
                    <span>{fetchedAnime?.rank}</span>
                    <span>{fetchedAnime?.popularity}</span>
                    <span>{fetchedAnime?.members}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 font-medium">
                  <span>{'Favourites:'}</span>
                  <span>{'Watching:'}</span>
                  <span>{'Planned'}</span>
                  <span>{'Dropped:'}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-destructive">{fetchedAnime?.favorites}</span>
                  <span className="text-secondary">{statistics?.watching}</span>
                  <span className="text-secondary">{statistics?.plan_to_watch}</span>
                  <span className="text-gray-400">{statistics?.dropped}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
          <span className="text-left text-lg font-medium text-secondary-foreground">Trailer</span>
          <iframe
            src={`${fetchedAnime?.trailer.embed_url}`}
            height="615"
            className="w-full rounded-xl"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
