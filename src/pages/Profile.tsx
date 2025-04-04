import { Avatar, AvatarImage } from '@/components/ui/avatar.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FaGithub, FaTelegramPlane, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { UserRoundPen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { logout } from '@/lib/Firebase/auth.ts';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/Firebase/firebaseConfig.ts';
import useAuthStore from '@/store/authStore.ts';
import { IFirestoreAnime } from '@/models/FirestoreAnime.ts';
import { FaStar } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa6';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart.tsx';
import { removeAnimeFromList } from '@/lib/Firestore/removeAnimeFromList.ts';
import { IoClose } from 'react-icons/io5';
import { TbLogout } from 'react-icons/tb';

const PROFILE_STATISTICS: { label: string; key: AnimeKeyList }[] = [
  { label: 'Favorites', key: 'favorites' },
  { label: 'Watching', key: 'watching' },
  { label: 'Planned', key: 'planned' },
  { label: 'Dropped', key: 'dropped' },
];

const USER_STATISTICS_CONFIG = {
  favorites: {
    label: 1,
    color: 'hsl(var(--chart-1))',
  },
  watching: {
    label: 2,
    color: 'hsl(var(--chart-2))',
  },
  planned: {
    label: 3,
    color: 'hsl(var(--chart-3))',
  },
  dropped: {
    label: 4,
    color: 'hsl(var(--chart-4))',
  },
} as const;

type AnimeList = {
  favorites: IFirestoreAnime[];
  watching: IFirestoreAnime[];
  planned: IFirestoreAnime[];
  dropped: IFirestoreAnime[];
};

type AnimeKeyList = keyof AnimeList;

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const userId = user?.uid;
  const [animeLists, setAnimeLists] = useState<AnimeList>({
    favorites: [],
    watching: [],
    planned: [],
    dropped: [],
  });

  useEffect(() => {
    if (!userId) return;
    const fetchAnimeLists = async () => {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setAnimeLists(
          userData.animeLists || {
            favorites: [],
            watching: [],
            planned: [],
            dropped: [],
          }
        );
      } else {
        return;
      }
    };

    fetchAnimeLists();
  }, [userId]);

  const userStatisticsData = [
    {
      list: 'Favorites',
      titles: animeLists['favorites'].length,
      fill: USER_STATISTICS_CONFIG.favorites.color,
    },
    {
      list: 'Watching',
      titles: animeLists['watching'].length,
      fill: USER_STATISTICS_CONFIG.watching.color,
    },
    {
      list: 'Planned',
      titles: animeLists['planned'].length,
      fill: USER_STATISTICS_CONFIG.planned.color,
    },
    {
      list: 'Dropped',
      titles: animeLists['dropped'].length,
      fill: USER_STATISTICS_CONFIG.dropped.color,
    },
  ];

  const handleRemove = async (animeId: number, listName: AnimeKeyList) => {
    if (!userId) return;
    await removeAnimeFromList(userId, listName, animeId);

    setAnimeLists((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((anime) => anime.id !== animeId),
    }));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/sign-in');
  };

  return (
    <div className="mt-20 w-full flex gap-5">
      <div className="flex w-1/4 h-full flex-col gap-5">
        <div className="flex w-full relative bg-secondaryBg rounded-xl p-5 flex-col items-center gap-5">
          <Avatar className="h-14 w-14">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <h1 className="text-lg font-bold font-montserrat text-white">{user?.displayName}</h1>
          <p className="text-sm text-muted-foreground">Description</p>
          <Badge variant="secondary">User</Badge>
          <div className="flex gap-2 justify-between">
            <Button>
              <FaGithub />
            </Button>
            <Button>
              <FaTelegramPlane />
            </Button>
            <Button>
              <FaInstagram />
            </Button>
            <Button>
              <FaLinkedin />
            </Button>
          </div>
          <Button className="h-7 w-7 absolute right-5 top-5">
            <UserRoundPen />
          </Button>
        </div>
        <div className="flex flex-col bg-secondaryBg rounded-xl p-5 items-start gap-5">
          <h1 className="text-sm font-bold text-white font-montserrat">Statistics</h1>
          <ChartContainer config={USER_STATISTICS_CONFIG} className="w-full max-h-[250px]">
            <BarChart
              accessibilityLayer
              data={userStatisticsData}
              layout="vertical"
              margin={{
                right: 35,
              }}
            >
              <YAxis
                dataKey="titles"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <XAxis dataKey="titles" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Bar dataKey="titles" layout="vertical" fill="var(--color-titles)" radius={4}>
                <LabelList
                  dataKey="titles"
                  position="insideLeft"
                  offset={8}
                  className="fill-white"
                  fontSize={12}
                />
                <LabelList
                  dataKey="list"
                  position="right"
                  offset={8}
                  className="fill-white"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        <Button
          variant="default"
          className="bg-secondaryBg hover:bg-destructive"
          onClick={handleLogout}
        >
          <span>Log out</span>
          <TbLogout />
        </Button>
      </div>
      <div className="flex flex-col h-full w-full gap-2">
        <div className="flex bg-background rounded-lg flex-col w-full">
          <Tabs defaultValue="Favorites">
            <TabsList className="h-full p-2 flex gap-2 bg-secondaryBg justify-start">
              {PROFILE_STATISTICS.map(({ label }) => (
                <TabsTrigger
                  value={label}
                  key={label}
                  className="px-10 py-3 gap-2 rounded-lg font-montserrat text-white text-sm data-[state=active]:text-white data-[state=active]:bg-secondary"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {PROFILE_STATISTICS.map(({ label, key }) => (
              <TabsContent value={label} key={key} className="bg-secondaryBg rounded-lg">
                <div className="bg-secondaryBg rounded-lg p-4 text-left flex flex-col gap-2">
                  {animeLists[key]?.length > 0 ? (
                    animeLists[key].map((anime) => (
                      <Link
                        to={`/catalog/item/${anime.id}`}
                        key={anime.title}
                        className="bg-accent px-3 py-2 rounded-lg hover:bg-primary"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-montserrat text-white text-sm font-bold w-1/2 line-clamp-1">
                            {anime.title}
                          </span>
                          <div className="w-1/2 flex items-center justify-end gap-2">
                            {/*<Badge variant="secondary" className="whitespace-nowrap">*/}
                            {/*  {anime.status}*/}
                            {/*</Badge>*/}
                            <span className="text-xs text-muted w-1/4 flex justify-center">
                              {anime.year || <FaSpinner />}
                            </span>
                            <span className="text-sm text-muted w-1/4 text-center">
                              {anime.type}
                            </span>
                            <div className="flex items-center text-myYellow gap-1 w-1/4 justify-end">
                              <FaStar className="size-3" />
                              <span className="font-montserrat text-sm font-bold">
                                {anime.userRating || '0'}
                              </span>
                            </div>
                            <Button
                              variant="default"
                              type="button"
                              className="ml-4 text-destructive hover:bg-accent"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemove(anime.id, key);
                              }}
                            >
                              <IoClose />
                            </Button>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <span className="flex items-center justify-center text-white text-sm font-bold font-montserrat">
                      {`There is no anime in the ${key} list yet.`}
                    </span>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
