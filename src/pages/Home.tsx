import Recommendations from '@/components/Recomendations/Recommendations.tsx';
import CurrentSeason from '@/components/CurrentSeason/CurrentSeason.tsx';
import MainSlider from '@/components/MainSlider/MainSlider.tsx';

const Home = () => {
  return (
    <div className="flex w-full flex-col justify-start">
      <MainSlider />
      <Recommendations />
      <CurrentSeason />
    </div>
  );
};

export default Home;
