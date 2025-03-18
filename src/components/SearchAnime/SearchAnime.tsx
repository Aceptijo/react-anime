import { Input } from '@/components/ui/input.tsx';
import { useEffect } from 'react';
import useSearchStore from '@/store/searchStore.ts';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const SearchAnime = () => {
  const { query, result, setQuery, searchAnime, isLoading, setOpen, isOpen } = useSearchStore();

  useEffect(() => {
    searchAnime(query);
  }, [query]);

  return (
    <div className="flex relative">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Find your anime"
        className="border-none bg-primary text-foreground placeholder:text-input transition-all focus:w-[425px] focus:outline-none "
      />
      {isOpen && (
        <div className="absolute top-10 flex flex-col bg-primary text-left w-full rounded-md overflow-hidden">
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="bg-primary flex gap-3 items-center px-2 py-2" key={index}>
                  <Skeleton className="h-[4.5rem] w-12 bg-accent" />
                  <Skeleton className="w-full h-5 bg-accent" />
                </div>
              ))}
            </>
          ) : (
            <>
              {result.slice(0, 5).map((anime) => (
                <Link
                  to={`/catalog/item/${anime.mal_id}`}
                  key={anime.mal_id}
                  onClick={() => {
                    setOpen(false);
                    setQuery('');
                  }}
                >
                  <div className="flex gap-3 items-center border-accent hover:bg-accent px-2 py-2">
                    <div className="w-12 h-[4.5rem] rounded-md flex items-center justify-center overflow-hidden bg-primary">
                      <img
                        src={`${anime.images.jpg.image_url}`}
                        alt={`${anime.title_english}`}
                        className="h-full object-cover w-full rounded-md"
                      />
                    </div>
                    <span className="text-sm line-clamp-1 w-4/5">
                      {anime.title_english || anime.title}
                    </span>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAnime;
