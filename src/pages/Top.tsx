import useTopAnimeStore from '@/store/TopAnimeStore.ts';
import { useEffect } from 'react';
import AnimeCard from '@/components/AnimeCard/AnimeCard.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

const Top = () => {
  const { topAnime, fetchTopAnime, isLoading } = useTopAnimeStore();

  useEffect(() => {
    fetchTopAnime();
  }, [fetchTopAnime]);

  return (
    <div className="mt-20">
      <div className="flex gap-5">
        <div className="flex flex-col">
          <div className="flex justify-between pb-5">
            <span className="text-lg font-bold">Top</span>
            <div className="flex gap-1">
              <Select>
                <SelectTrigger className="flex gap-3 border-none">
                  <SelectValue placeholder="Descending order" />
                </SelectTrigger>
                <SelectContent className="border-secondaryBg bg-secondaryBg">
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="releaseDate">Release Date</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="flex gap-3 border-none">
                  <SelectValue placeholder="By rating" />
                </SelectTrigger>
                <SelectContent className="border-secondaryBg bg-secondaryBg">
                  <SelectItem value="highLow">High to Low</SelectItem>
                  <SelectItem value="lowHigh">Low to High</SelectItem>
                  <SelectItem value="mostRated">Most Rated</SelectItem>
                  <SelectItem value="LeastRated">Least Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid w-full grid-cols-5 gap-5">
              {topAnime?.map((anime) => <AnimeCard anime={anime} key={anime.mal_id} />)}
            </div>
          )}
        </div>
        {/*<div className="flex h-full w-1/5 flex-wrap rounded-xl bg-secondaryBg p-4">*/}
        {/*  <span className="mb-6 w-full text-left font-medium">Genres</span>*/}
        {/*  {genres.map((genre) => (*/}
        {/*    <div className="flex w-1/2 gap-1" key={genre.mal_id}>*/}
        {/*      <Checkbox id={genre.name} />*/}
        {/*      <Label htmlFor={`${genre.name}`} className="text-sm">*/}
        {/*        {genre.name}*/}
        {/*      </Label>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Top;
