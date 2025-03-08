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
import { Skeleton } from '@/components/ui/skeleton.tsx';

const CatalogItem = () => {
  const { fetchById, fetchedAnime, isLoading: isLoadingAnime } = useAnimeByIdStore();
  const { statistics, fetchStatistics, isLoading: isLoadingStatistics } = useStatisticsStore();
  const { id } = useParams();
  const [selectedValue, setSelectedValue] = useState<string>('');

  useEffect(() => {
    fetchById(Number(id));
    fetchStatistics(Number(id));
  }, [id]);

  return (
    <div className="mt-20 flex w-full gap-5">
      {isLoadingAnime && isLoadingStatistics ? (
        <>
          <div className="flex w-1/4 flex-col gap-3">
            <Skeleton className="h-[360px] w-full bg-secondaryBg" />
            <div className="flex gap-1">
              <Skeleton className="h-10 w-1/4 bg-secondaryBg" />
              <Skeleton className="h-10 w-1/4 bg-secondaryBg" />
              <Skeleton className="h-10 w-1/4 bg-secondaryBg" />
              <Skeleton className="h-10 w-1/4 bg-secondaryBg" />
            </div>
            <Skeleton className="h-[460px] w-full bg-secondaryBg" />
          </div>
          <div className="flex w-full flex-col gap-5">
            <Skeleton className="h-10 w-full bg-secondaryBg" />
            <Skeleton className="h-1/3 w-full bg-secondaryBg" />
            <Skeleton className="h-1/4 w-full bg-secondaryBg" />
            <Skeleton className="h-1/2 w-full bg-secondaryBg" />
          </div>
        </>
      ) : (
        <>
          <div className="flex w-1/4 flex-col gap-3">
            <img
              className="rounded-xl"
              src={`${fetchedAnime?.images.jpg.large_image_url}`}
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
            <div className="flex flex-col items-start gap-3 rounded-xl bg-secondaryBg p-4 text-left">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Type</span>
                <span>{fetchedAnime?.type || 'Unknown'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Source</span>
                <span>{fetchedAnime?.source || 'Unknown'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Episodes</span>
                <div className="flex gap-5">
                  <span>{fetchedAnime?.episodes || 'Unknown'}</span>
                  <span className="text-muted-foreground">{fetchedAnime?.duration}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Aired</span>
                <span>{fetchedAnime?.aired.string}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Studios</span>
                <span>{fetchedAnime?.studios.length ? fetchedAnime?.studios[0].name : 'None'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
                <Badge
                  variant="outline"
                  className="border-secondary text-sm font-medium text-secondary"
                >
                  {fetchedAnime?.status}
                </Badge>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Rating</span>
                <Badge
                  variant="outline"
                  className="border-destructive text-sm font-medium text-destructive"
                >
                  {fetchedAnime?.rating || 'Unknown'}
                </Badge>
              </div>
              <div className="flex flex-col gap-1">
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
                {fetchedAnime?.title_english || fetchedAnime?.title}
              </h1>
              <div className="mt-5 flex items-center text-myYellow">
                <StarRoundedIcon />
                <h1 className="mr-4 text-2xl font-medium">{fetchedAnime?.score ?? 0}</h1>
                <span className="text-xl text-muted-foreground">{`${fetchedAnime?.scored_by ?? 0} users`}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-xl bg-secondaryBg text-left">
              <Tabs defaultValue="description">
                <TabsList className="bg-secondaryBg px-4 py-9">
                  <TabsTrigger
                    value="description"
                    className="border border-secondaryBg px-10 py-3 text-base data-[state=active]:border-secondary data-[state=active]:text-secondary data-[state=active]:bg-secondary-background"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="statistics"
                    className="border border-secondaryBg px-10 py-3 text-base data-[state=active]:border-secondary data-[state=active]:text-secondary data-[state=active]:bg-secondary-background"
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
                        <span className="text-myYellow">{fetchedAnime?.score ?? 0}</span>
                        <span>{`${fetchedAnime?.scored_by || '0'} users`}</span>
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
              <h1 className="text-lg font-medium text-secondary-foreground">Pictures</h1>
              <div className="flex h-36 gap-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="basis-1/4 content-center overflow-hidden rounded-xl bg-primary text-center"
                    key={index}
                  >
                    <span className="text-4xl text-muted-foreground">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-5 rounded-xl bg-secondaryBg p-4">
              <span className="text-left text-lg font-medium text-secondary-foreground">
                Trailer
              </span>
              {fetchedAnime?.trailer.embed_url ? (
                <iframe
                  src={`${fetchedAnime?.trailer.embed_url}`}
                  height="615"
                  className="w-full rounded-xl"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xl font-bold">
                  API does not contain a trailer for this anime! :(
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CatalogItem;
