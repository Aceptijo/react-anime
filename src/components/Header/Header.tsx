import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu.tsx';
import { Link, useNavigate } from 'react-router-dom';
import useRandomAnimeStore from '@/store/RandomAnimeStore.ts';
import { Button } from '@/components/ui/button.tsx';

const Header = () => {
  const { randomAnime, fetchRandomAnime } = useRandomAnimeStore();
  const navigate = useNavigate();

  const handleRandomClick = async () => {
    await fetchRandomAnime();
    navigate(`/catalog/item/${randomAnime?.mal_id}`);
  };

  return (
    <header className="absolute mb-20 flex h-20 w-full">
      <div className="ml-auto mr-auto flex min-w-[1280px] items-center gap-10 text-sm">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-lg`}>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-lg`}>
                <Link to="/top">Top</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-lg`}>
                <Button onClick={handleRandomClick} className="text-sm">
                  Random
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-lg`}>
                <Link to="/catalog">Anime</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-lg`}>
                <Link to="/releases" className="text-lg">
                  Releases
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-lg`}>
                <Link to="/calendar">Calendar</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
