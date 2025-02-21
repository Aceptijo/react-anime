import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@/components/ui/button.tsx';

const Footer = () => {
  return (
    <footer className="mt-20 flex h-20 w-full items-center justify-between">
      <a href={'https://github.com/Aceptijo/react-anime'} className="text-sm">
        2025 React-anime
      </a>
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
    </footer>
  );
};

export default Footer;
