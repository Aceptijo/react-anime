import Recommendations from '@/components/Recomendations/Recommendations.tsx';
import CurrentSeason from '@/components/CurrentSeason/CurrentSeason.tsx';

const Home = () => {
  return (
    <div className="flex flex-col justify-start mt-14 w-full">
      <Recommendations />
      <CurrentSeason />
    </div>
  );
};

export default Home;
