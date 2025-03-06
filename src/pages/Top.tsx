import useTopAnimeStore from '@/store/TopAnimeStore.ts';
import { useEffect } from 'react';
import AnimeCard from '@/components/AnimeCard/AnimeCard.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const Top = () => {
  const { topAnime, fetchTopAnime, isLoading } = useTopAnimeStore();

  useEffect(() => {
    fetchTopAnime(25, 1);
  }, [fetchTopAnime]);

  return (
    <div className="mt-20">
      {isLoading ? (
        <div className="flex flex-col gap-5">
          <Skeleton className="h-10 w-1/5 bg-secondaryBg" />
          <div className="flex flex-wrap gap-5">
            {Array.from({ length: 25 }).map((_, index) => (
              <Skeleton className="h-[360px] w-[240px] bg-secondaryBg" key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex gap-5">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between ">
              <span className="text-xl font-bold">Top</span>
            </div>
            <div className="grid w-full grid-cols-5 gap-5">
              {topAnime?.map((anime) => <AnimeCard anime={anime} key={anime.mal_id} />)}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Top;
