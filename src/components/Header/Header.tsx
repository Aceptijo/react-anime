import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu.tsx';
import { Link, useNavigate } from 'react-router-dom';
import useRandomAnimeStore from '@/store/randomAnimeStore.ts';
import { Button } from '@/components/ui/button.tsx';
import Logo from '@/components/icons/Logo.tsx';
import { Avatar, AvatarImage } from '@/components/ui/avatar.tsx';
import { BellRing } from 'lucide-react';
import useAuthStore from '@/store/authStore.ts';
import SearchAnime from '@/components/SearchAnime/SearchAnime.tsx';

const Header = () => {
  const { randomAnime, fetchRandomAnime } = useRandomAnimeStore();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleRandomClick = async () => {
    await fetchRandomAnime();
    if (randomAnime?.mal_id) {
      navigate(`/catalog/item/${randomAnime?.mal_id}`);
    }
  };

  return (
    <header className="fixed bg-background mb-20 flex h-20 w-full z-50">
      <div className="ml-auto mr-auto flex min-w-[1280px] items-center gap-5 justify-between">
        <div className="flex">
          {user && (
            <NavigationMenu>
              <NavigationMenuList>
                <Link to={'/'} className="mr-3 group ">
                  <Logo />
                </Link>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} `}>
                    <Link to="/catalog">Anime</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} `}>
                    <Link to="/top">Top</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} `}>
                    <Link to="/calendar">Calendar</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} `}>
                    <Button onClick={handleRandomClick} className="text-sm shadow-none">
                      Random
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div className="flex gap-5 items-center">
          {user && (
            <>
              <SearchAnime />
              <Button className="bg-background size-10">
                <BellRing />
              </Button>
              <Link to="/profile/scandave">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/sign-in">
                <Button>Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
