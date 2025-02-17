import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu.tsx';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="absolute flex w-full h-14 bg-gray-300 ">
      <div className="flex min-w-[1280px] ml-auto mr-auto gap-5">
        <NavigationMenu>
          <NavigationMenuList className="gap-5">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/top">Top 100</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
