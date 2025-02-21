import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';

const Footer = () => {
  return (
    <div className="mt-10 flex h-20 w-full items-center justify-between">
      <Link to={'/'} className="text-sm">
        2025 React-anime
      </Link>
      <div className="flex gap-2">
        <Button className="group hover:bg-foreground" asChild>
          <a href={'https://t.me/ScanDave'}>
            <TelegramIcon className="text-[#2d9ed6] group-hover:text-[#2d9ed6]" />
          </a>
        </Button>
        <Button className="group hover:bg-foreground" asChild>
          <a href={'https://github.com/Aceptijo'}>
            <GitHubIcon className="group-hover:text-black" />
          </a>
        </Button>
        <Button className="group hover:bg-foreground" asChild>
          <a href={'https://www.instagram.com/scandave/'}>
            <InstagramIcon className="group-hover:text-[#fd0069]" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
