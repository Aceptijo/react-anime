import { Link, useParams } from 'react-router-dom';
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
import useStatisticsStore from '@/store/statisticsStore.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import useReviewsStore from '@/store/reviewsStore.ts';
import ReviewCard from '@/components/ReviewCard/ReviewCard.tsx';
import useAnimeByIdStore from '@/store/animeByIdStore.ts';
import { Button } from '@/components/ui/button.tsx';
import {
  MdOutlineRateReview,
  MdOutlineOndemandVideo,
  MdOutlineListAlt,
  MdInsertChartOutlined,
} from 'react-icons/md';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart.tsx';
import { Bar, BarChart, Label, Pie, PieChart, XAxis } from 'recharts';
import { STATISTICS_CHART_CONFIG } from '@/components/CatalogItem/statisticsConfig.ts';
import { getStatisticsChartData } from '@/components/CatalogItem/statisticsData.ts';
import { getScoresChartData } from '@/components/CatalogItem/scoresData.ts';
import { SCORES_CHART_CONFIG } from '@/components/CatalogItem/scoresConfig.ts';
import useEpisodesStore from '@/store/episodesStore.ts';
import useAuthStore from '@/store/authStore.ts';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/Firebase/firebaseConfig.ts';
import { updateUserAnimeList } from '@/lib/Firestore/updateUserAnimeList.ts';
import { IFirestoreAnime } from '@/models/FirestoreAnime.ts';

const CATALOG_ITEM_TABS = ['Episodes', 'Statistics', 'Reviews', 'Trailer'];

type SelectedValueTypes = 'favorites' | 'watching' | 'planned' | 'dropped';

const CatalogItem = () => {
  const { fetchById, fetchedAnime, isLoading: isLoadingAnime } = useAnimeByIdStore();
  const { statistics, fetchStatistics, isLoading: isLoadingStatistics } = useStatisticsStore();
  const { reviews, fetchReviews, isLoading: isLoadingReviews } = useReviewsStore();
  const { episodes, fetchEpisodes, isLoading: isLoadingEpisodes } = useEpisodesStore();
  const { id } = useParams();
  const [selectedValue, setSelectedValue] = useState<SelectedValueTypes | ''>('');
  const { user } = useAuthStore();
  const userId = user?.uid;

  useEffect(() => {
    if (!userId) return;
    const fetchAnimeStatus = async () => {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) return;

      const userData = userDoc.data();
      const animeLists = userData.animeList || {};

      for (const listName of ['favorites', 'watching', 'planned', 'dropped']) {
        if (
          animeLists[listName]?.some((item: IFirestoreAnime) => item.id === fetchedAnime?.mal_id)
        ) {
          setSelectedValue(listName as SelectedValueTypes);
          return;
        }
      }
    };

    fetchAnimeStatus();
  }, [userId, fetchedAnime]);

  const handleToggle = async (value: SelectedValueTypes) => {
    if (!userId || !fetchedAnime) return;

    const animeToSave: IFirestoreAnime = {
      id: fetchedAnime.mal_id,
      title: fetchedAnime.title,
      userRating: fetchedAnime.score,
      year: fetchedAnime.year,
      type: fetchedAnime.type,
      status: fetchedAnime.status,
    };

    if (selectedValue) {
      await updateUserAnimeList(userId, selectedValue, animeToSave);
    }

    if (value) {
      await updateUserAnimeList(userId, value, animeToSave);
    }

    setSelectedValue(value);
  };

  const statusMapping: Record<string, string> = {
    'Currently Airing': 'Airing',
    'Finished Airing': 'Complete',
    'Not yet aired': 'Upcoming',
  };

  const ratingMapping: Record<string, string> = {
    'G - All Ages': 'g',
    'PG - Children': 'pg',
    'PG-13 - Teens 13 or older': 'pg13',
    'R - 17+ (violence & profanity)': 'r17',
    'R+ - Mild Nudity': 'r',
    'Rx - Hentai': 'rx',
  };

  const getStatusForUrl = (status: string) => statusMapping[status] || '';
  const getRatingForUrl = (rating: string) => ratingMapping[rating] || '';

  const scoresChartData = getScoresChartData(statistics);

  const statisticsChartData = getStatisticsChartData(statistics, fetchedAnime);

  const formatUsersCount = (total: string) => {
    if (total.length === 6) {
      return `${total.slice(0, 3)}K`;
    } else if (total.length > 6) {
      return `${total.slice(0, 1)}.${total.charAt(1)}KK`;
    } else if (total.length === 5) {
      return `${total.slice(0, 2)}K`;
    }
    return total;
  };

  useEffect(() => {
    const fetchData = async () => {
      fetchById(Number(id));
      fetchEpisodes(Number(id));
      setTimeout(() => {
        fetchStatistics(Number(id));
        fetchReviews(Number(id));
      }, 1000);
    };
    fetchData();
  }, [id]);

  return (
    <div className="mt-24 flex w-full gap-5 flex-col">
      {isLoadingAnime && isLoadingStatistics ? (
        <>
          <div className="flex gap-5">
            <Skeleton className="h-[450px] w-1/3 bg-secondaryBg" />
            <div className="flex flex-col w-full justify-end gap-3">
              <Skeleton className="h-10 w-2/3 bg-secondaryBg" />
              <Skeleton className="h-4 w-2/3 bg-secondaryBg" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-[150px] bg-secondaryBg" />
                <Skeleton className="h-6 w-[150px] bg-secondaryBg" />
              </div>
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton className="h-4 w-2/3 bg-secondaryBg" key={index} />
              ))}
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton className="h-10 w-[45px] bg-secondaryBg" key={index} />
                ))}
              </div>
            </div>
          </div>
          <Skeleton className="h-14 w-full bg-secondaryBg" />
          <Skeleton className="h-28 w-full bg-secondaryBg" />
        </>
      ) : (
        <>
          <div className="flex gap-5">
            <div className="h-[453px]">
              <img
                className="rounded-lg object-cover h-full"
                src={`${fetchedAnime?.images.jpg.large_image_url}`}
                alt={`${fetchedAnime?.title_english}`}
              />
            </div>
            <div className="flex w-3/4 self-end">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-start mt-5">
                    <h1 className="text-left text-2xl w-2/3 font-montserrat font-bold text-white">
                      {fetchedAnime?.title_english || fetchedAnime?.title}
                    </h1>
                    <div className="flex items-center text-myYellow ">
                      <StarRoundedIcon className="!size-8" />
                      <h1 className="mr-4 font-montserrat text-2xl font-bold">
                        {fetchedAnime?.score ?? 0}
                      </h1>
                    </div>
                  </div>
                  <p className="text-left text-sm font-bold font-montserrat text-muted-foreground">
                    {fetchedAnime?.title}
                  </p>
                  <div className="flex mt-5 gap-2 items-center">
                    <Link to={`/catalog?status=${getStatusForUrl(String(fetchedAnime?.status))}`}>
                      <Badge
                        variant="outline"
                        className="border-secondary font-medium text-secondary hover:bg-secondary hover:text-white"
                      >
                        {fetchedAnime?.status}
                      </Badge>
                    </Link>
                    <Link to={`/catalog?rating=${getRatingForUrl(String(fetchedAnime?.rating))}`}>
                      <Badge
                        variant="outline"
                        className="border-destructive font-medium text-destructive hover:bg-destructive hover:text-white"
                      >
                        {fetchedAnime?.rating || 'Unknown'}
                      </Badge>
                    </Link>
                  </div>
                  <div className="flex flex-col text-left mt-5 text-sm text-muted gap-2">
                    <div className="flex gap-2">
                      <span>Type:</span>
                      <span className="text-white">{fetchedAnime?.type || 'Unknown'}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Source:</span>
                      <span className="text-white">{fetchedAnime?.source || 'Unknown'}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span>Genres:</span>
                      <div className="flex flex-wrap gap-1">
                        {fetchedAnime?.genres.map((genre) => (
                          <Link to={`/catalog?genre=${genre.mal_id}`} key={genre.mal_id}>
                            <Badge className="font-medium">{genre.name}</Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span>Studios:</span>
                      <span className="text-white">
                        <span>
                          {fetchedAnime?.studios.length ? fetchedAnime?.studios[0].name : 'None'}
                        </span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span>Season:</span>
                      <span className="text-white">
                        {fetchedAnime?.season
                          ? fetchedAnime?.season?.charAt(0).toUpperCase() +
                            fetchedAnime?.season?.slice(1)
                          : 'Unknown'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span>Year:</span>
                      <span className="text-white">{fetchedAnime?.year}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Episodes:</span>
                      <span className="text-white">{fetchedAnime?.episodes}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Duration:</span>
                      <span className="text-white">{fetchedAnime?.duration}</span>
                    </div>
                  </div>
                  <TooltipProvider>
                    <ToggleGroup
                      type="single"
                      value={selectedValue}
                      onValueChange={handleToggle}
                      size="lg"
                      className="flex mt-5 justify-start"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <ToggleGroupItem
                              value="favorites"
                              aria-label="Favorites"
                              className="bg-primary rounded-lg hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-destructive data-[state=on]:text-white"
                            >
                              <FavoriteRoundedIcon className="text-white" />
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
                              className="bg-primary rounded-lg hover:bg-accent hover:text-secondary-foreground data-[state=on]:bg-secondary data-[state=on]:text-white"
                            >
                              <VisibilityIcon className="text-white" />
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
                              className="bg-primary rounded-lg hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-chart-3 data-[state=on]:text-white"
                            >
                              <WatchLaterIcon className="text-white" />
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
                              className="bg-primary rounded-lg hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-gray-400 data-[state=on]:text-white"
                            >
                              <DeleteIcon className="text-white" />
                            </ToggleGroupItem>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Dropped</TooltipContent>
                      </Tooltip>
                    </ToggleGroup>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
          <p className="text-left break-words">{fetchedAnime?.synopsis}</p>
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-3 rounded-lg text-left">
              <Tabs defaultValue="Episodes">
                <TabsList className="h-full p-2 flex gap-2 bg-secondaryBg justify-start">
                  {CATALOG_ITEM_TABS.map((tab) => (
                    <TabsTrigger
                      value={tab}
                      key={tab}
                      className="px-10 py-3 rounded-lg font-montserrat text-white text-sm data-[state=active]:text-white data-[state=active]:bg-secondary"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="Episodes" className="bg-secondaryBg rounded-lg p-4">
                  {isLoadingEpisodes ? (
                    <Skeleton className="h-[272px]" />
                  ) : episodes.length > 0 ? (
                    <div className="grid grid-cols-4 gap-5">
                      {episodes.map((episode) => (
                        <a
                          href={`${episode.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={episode.mal_id}
                          className="relative"
                        >
                          <Button className="h-[150px] w-full bg-accent rounded-lg flex flex-col items-center justify-center">
                            <span className="text-white font-montserrat w-full font-bold line-clamp-3 text-wrap break-all">
                              {episode.title}
                            </span>
                            <span className="text-muted absolute bottom-2 text-xs flex self-start">{`${episode.mal_id} episode `}</span>
                          </Button>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className=" flex justify-start gap-5 items-center">
                      <MdOutlineListAlt className="size-12" />
                      <div className="flex flex-col gap-1">
                        <span className="text-white text-sm font-bold font-montserrat">
                          The episodes haven't been released yet
                        </span>
                        <p className="text-xs ">Maybe the anime hasn't been released yet.</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="Trailer">
                  <div className="flex h-full w-full flex-col gap-5 rounded-lg bg-secondaryBg p-4">
                    {fetchedAnime?.trailer.embed_url ? (
                      <iframe
                        src={`${fetchedAnime?.trailer.embed_url}`}
                        height="615"
                        className="w-full rounded-lg"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : (
                      <div className=" flex justify-start gap-5 items-center">
                        <MdOutlineOndemandVideo className="size-12" />
                        <div className="flex flex-col gap-1">
                          <span className="text-white text-sm font-bold font-montserrat">
                            API does not contain a trailer for this anime
                          </span>
                          <p className="text-xs ">
                            Maybe the anime is new or the anime just doesn't have a trailer.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="Reviews">
                  <div className="bg-secondaryBg rounded-xl p-4 flex flex-col gap-2">
                    {isLoadingReviews ? (
                      <Skeleton className="h-[272px]" />
                    ) : reviews.length > 0 ? (
                      reviews.map((review) => <ReviewCard review={review} key={review.mal_id} />)
                    ) : (
                      <div className=" flex justify-start gap-5 items-center">
                        <MdOutlineRateReview className="size-12" />
                        <div className="flex flex-col gap-1">
                          <span className="text-white text-sm font-bold font-montserrat">
                            No reviews yet
                          </span>
                          <p className="text-xs ">
                            Maybe the anime is new, so there are no reviews yet.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="Statistics" className="bg-secondaryBg p-4 rounded-lg">
                  {isLoadingStatistics ? (
                    <Skeleton className="h-[272px]" />
                  ) : statistics ? (
                    <div className="flex">
                      <div className="flex gap-10 basis-1/2">
                        <div className="flex flex-col justify-between gap-2 text-sm text-muted">
                          <span>{'Favourites:'}</span>
                          <span>{'Watching:'}</span>
                          <span>{'Planned'}</span>
                          <span>{'Dropped:'}</span>
                          <span>{'Total:'}</span>
                        </div>
                        <div className="flex flex-col text-sm justify-between gap-2">
                          <span className="text-destructive">{fetchedAnime?.favorites}</span>
                          <span className="text-secondary">{statistics?.watching}</span>
                          <span className="text-chart-3">{statistics?.plan_to_watch}</span>
                          <span className="text-gray-400">{statistics?.dropped}</span>
                          <span className="text-white">{statistics?.total}</span>
                        </div>
                        <ChartContainer
                          config={STATISTICS_CHART_CONFIG}
                          className="ml-16 aspect-square max-h-[150px] w-[200px]"
                        >
                          <PieChart>
                            <ChartTooltip
                              cursor={false}
                              content={
                                <ChartTooltipContent className="px-2 text-white space-y-2" />
                              }
                            />
                            <Pie
                              data={statisticsChartData}
                              dataKey="users"
                              nameKey="statistic"
                              innerRadius={45}
                              outerRadius={70}
                              strokeWidth={1}
                            >
                              <Label
                                content={({ viewBox }) => {
                                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                    return (
                                      <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                      >
                                        <tspan
                                          x={viewBox.cx}
                                          y={viewBox.cy}
                                          className="fill-white font-montserrat text-2xl font-bold"
                                        >
                                          {formatUsersCount(String(statistics?.total))}
                                        </tspan>
                                        <tspan
                                          x={viewBox.cx}
                                          y={(viewBox.cy || 0) + 20}
                                          className="fill-muted-foreground"
                                        >
                                          Users
                                        </tspan>
                                      </text>
                                    );
                                  }
                                }}
                              />
                            </Pie>
                          </PieChart>
                        </ChartContainer>
                      </div>
                      <div className="flex gap-10 w-full basis-1/2">
                        <div className="flex flex-col justify-between gap-2 text-sm text-muted">
                          <span>{`Score:`}</span>
                          <span>{`Score by:`}</span>
                          <span>{`Rank:`}</span>
                          <span>{`Popularity:`}</span>
                        </div>
                        <div className="flex flex-col justify-between text-sm text-white">
                          <span className="text-myYellow">{fetchedAnime?.score ?? 0}</span>
                          <span>{fetchedAnime?.scored_by || '0'}</span>
                          <span>{fetchedAnime?.rank}</span>
                          <span>{fetchedAnime?.popularity}</span>
                        </div>
                        <ChartContainer
                          config={SCORES_CHART_CONFIG}
                          className="aspect-square max-h-[150px] w-full"
                        >
                          <BarChart data={scoresChartData}>
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent hideLabel />}
                            />
                            <XAxis
                              dataKey="score"
                              tickLine={false}
                              tickMargin={17}
                              axisLine={false}
                            />
                            <Bar dataKey="votes" radius={10} />
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </div>
                  ) : (
                    <div className=" flex justify-start gap-5 items-center">
                      <MdInsertChartOutlined className="size-12" />
                      <div className="flex flex-col gap-1">
                        <span className="text-white text-sm font-bold font-montserrat">
                          There are no statistics on this anime yet
                        </span>
                        <p className="text-xs ">
                          Maybe the anime was released recently and has not collected statistics yet
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CatalogItem;
