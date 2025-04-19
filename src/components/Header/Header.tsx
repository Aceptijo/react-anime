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
import { BellRing, Menu, Search, User } from 'lucide-react';
import useAuthStore from '@/store/authStore.ts';
import SearchAnime from '@/components/SearchAnime/SearchAnime.tsx';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet.tsx';

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
    <header className="fixed bg-background mb-20 flex w-full lg:max-w-[1280px] h-20 z-50">
      <div className="ml-auto mr-auto flex p-3 lg:p-0 w-full items-center gap-5 justify-between">
        <div className="flex">
          {user && (
            <NavigationMenu>
              <NavigationMenuList>
                <Link to={'/'} className="mr-3 group ">
                  <Logo />
                </Link>
                <NavigationMenuItem className="hidden lg:inline-block">
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} `}>
                    <Link to="/catalog">Anime</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden lg:inline-block">
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} `}>
                    <Link to="/top">Top</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden lg:inline-block">
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} `}>
                    <Link to="/calendar">Calendar</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="hidden lg:inline-block">
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
              <div className="hidden lg:inline-block">
                <SearchAnime />
              </div>
              <Sheet>
                <SheetTrigger className="lg:hidden">
                  <Search className="text-white !size-4 mr-4" />
                </SheetTrigger>
                <SheetContent side="top" className="flex items-center flex-col w-full">
                  <SheetHeader className="flex flex-col items-center">
                    <SheetTitle className="text-white font-inter">Search</SheetTitle>
                    <SheetDescription>
                      Enter the name of the anime you need to find
                    </SheetDescription>
                  </SheetHeader>
                  <div className="w-full inline-block lg:hidden">
                    <SearchAnime />
                  </div>
                </SheetContent>
              </Sheet>

              <Button className="bg-background size-10">
                <BellRing className="text-white" />
              </Button>
              <Link
                to={`/profile/${user.email?.slice(0, user.email?.indexOf('@'))}`}
                className="hidden lg:inline-block"
              >
                <Avatar className="lg:h-10 lg:w-10 h-7 w-7">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </Link>
              <Button className="bg-background size-10 lg:hidden">
                <Link to={`/profile/${user.email?.slice(0, user.email?.indexOf('@'))}`}>
                  <User />
                </Link>
              </Button>
              <Sheet>
                <SheetTrigger className="lg:hidden">
                  <Menu className="text-white" />
                </SheetTrigger>
                <SheetContent className="border-primary w-1/3 px-2">
                  <NavigationMenu className="mt-5 max-w-full">
                    <NavigationMenuList className="flex flex-col items-center gap-2 w-full">
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} `}>
                          <Link to="/catalog">Anime</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()}`}>
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
                </SheetContent>
              </Sheet>

              {/*<DropdownMenu>*/}
              {/*  <DropdownMenuTrigger className="lg:hidden sm:inline-block">*/}
              {/*    <Menu className="text-white" />*/}
              {/*  </DropdownMenuTrigger>*/}
              {/*  <DropdownMenuContent className="bg-secondaryBg flex flex-col items-start p-2 gap-2 border-primary border mt-7 h-screen w-[300px]">*/}
              {/*    <DropdownMenuItem className="font-inter font-medium text-white px-3 py-2 rounded-lg w-full text-left">*/}
              {/*      <Link to="/catalog">Anime</Link>*/}
              {/*    </DropdownMenuItem>*/}
              {/*    <DropdownMenuItem className="font-inter font-medium text-white px-3 py-2 rounded-lg w-full text-left">*/}
              {/*      <Link to="/top">Top</Link>*/}
              {/*    </DropdownMenuItem>*/}
              {/*    <DropdownMenuItem className="font-inter font-medium text-white px-3 py-2 rounded-lg w-full text-left">*/}
              {/*      <Link to="/calendar">Calendar</Link>*/}
              {/*    </DropdownMenuItem>*/}
              {/*    <DropdownMenuItem className="font-inter font-medium text-white px-3 py-2 rounded-lg w-full text-left">*/}
              {/*      <Link to="/catalog">Random</Link>*/}
              {/*    </DropdownMenuItem>*/}
              {/*  </DropdownMenuContent>*/}
              {/*</DropdownMenu>*/}
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
