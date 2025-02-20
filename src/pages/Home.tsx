import Recommendations from '@/components/Recomendations/Recommendations.tsx';
import CurrentSeason from '@/components/CurrentSeason/CurrentSeason.tsx';
import Header from '@/components/Header/Header.tsx';

const Home = () => {
  return (
    <div className="flex w-full flex-col justify-start">
      <Header />
      <Recommendations />
      <CurrentSeason />
    </div>
  );
};

export default Home;
