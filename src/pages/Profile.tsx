import { Avatar, AvatarImage } from '@/components/ui/avatar.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FaGithub, FaTelegramPlane, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { UserRoundPen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import useUserStore from '@/store/UserStore.ts';
import AnimeCard from '@/components/AnimeCard/AnimeCard.tsx';

const PROFILE_STATISTICS = ['Watching', 'Planned', 'Favorites', 'Dropped'];

const Profile = () => {
  const { watched } = useUserStore();

  return (
    <div className="mt-20 w-full flex gap-5">
      <div className="flex w-1/4 h-full flex-col gap-5">
        <div className="flex w-full relative bg-secondaryBg rounded-xl p-5 flex-col items-center gap-5">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <h1 className="text-lg font-bold">ScanDave</h1>
          <p className="text-sm text-muted-foreground">Description</p>
          <Badge variant="secondary">Admin</Badge>
          <p className="text-sm text-muted-foreground">Date of registration 3.14.2025 </p>
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
          <h1 className="text-lg font-bold">Statistics</h1>
          <div className="w-full flex flex-col gap-2">
            {PROFILE_STATISTICS.map((statistic, index) => (
              <div className="flex justify-between items-center" key={statistic}>
                <span className="text-sm">{statistic}</span>
                <span className="text-secondary text-sm">{index}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex bg-secondaryBg rounded-xl h-full p-5 flex-col w-full">
        <div className="w-full border-b-primary border-b-2">
          <Tabs defaultValue="Watching" className="px-0 w-fit">
            <TabsList className="flex bg-secondaryBg p-0">
              {PROFILE_STATISTICS.map((tab) => (
                <TabsTrigger
                  value={tab}
                  key={tab}
                  className="border-b-2 border-b-primary rounded-none text-sm w-full py-[9px] px-4 data-[state=active]:border-secondary data-[state=active]:shadow-none data-[state=active]:bg-secondaryBg data-[state=active]:text-secondary"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="mt-5 grid-cols-4 grid gap-5">
          {watched.map((anime) => (
            <AnimeCard anime={anime} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
