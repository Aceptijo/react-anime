import useTopAnimeStore from '@/store/topAnimeStore.ts';
import { useEffect, useRef } from 'react';
import AnimeCard from '@/components/AnimeCard/AnimeCard.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const Top = () => {
  const { topAnime, fetchTopAnime, pagination, isLoading } = useTopAnimeStore();
  const lastElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pagination?.has_next_page || !pagination.current_page || isLoading) return;

    if (topAnime.length >= 100) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchTopAnime(25, pagination?.current_page + 1);
        }
      },
      { threshold: 1.0 }
    );

    setTimeout(() => {
      if (lastElement.current) {
        observer.observe(lastElement.current);
      }
    }, 100);

    return () => {
      if (lastElement.current) observer.unobserve(lastElement.current);
    };
  }, [fetchTopAnime, isLoading, pagination]);

  useEffect(() => {
    if (topAnime.length === 0) {
      fetchTopAnime(25, 1);
    }
  }, [fetchTopAnime]);

  return (
    <div className="mt-24">
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
            <div className="flex items-center gap-3">
              <span className="text-lg text-white font-montserrat font-bold">Top</span>
              <span className="text-lg font-medium font-montserrat text-muted-foreground">
                (100)
              </span>
            </div>
            <div className="grid w-full grid-cols-5 gap-5">
              {topAnime?.map((anime) => <AnimeCard anime={anime} key={anime.mal_id} />)}
            </div>
          </div>
        </div>
      )}
      <div ref={lastElement} />
    </div>
  );
};

export default Top;
