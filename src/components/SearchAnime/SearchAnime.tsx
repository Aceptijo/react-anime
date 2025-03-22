import { Input } from '@/components/ui/input.tsx';
import { useEffect, useRef } from 'react';
import useSearchStore from '@/store/searchStore.ts';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { FaStar } from 'react-icons/fa';

const SearchAnime = () => {
  const { query, result, setQuery, searchAnime, isLoading, setOpen, isOpen } = useSearchStore();
  const searchRef = useRef(null);

  useEffect(() => {
    searchAnime(query);
  }, [query]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (searchRef.current && !(searchRef.current as HTMLElement).contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [setOpen]);

  return (
    <div className="relative w-[250px] focus-within:w-[425px] transition-all" ref={searchRef}>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Find your anime"
        className="border-none bg-primary w-full text-foreground placeholder:text-input transition-all focus:w-full focus:outline-none "
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
                    <div className="w-10 h-[3.5rem] rounded-md flex items-center justify-center overflow-hidden bg-primary">
                      <img
                        src={`${anime.images.jpg.image_url}`}
                        alt={`${anime.title_english}`}
                        className="h-full object-cover w-full rounded-md"
                      />
                    </div>
                    <div className="w-4/5 flex flex-col gap-2">
                      <span className="text-sm line-clamp-1 font-medium">
                        {anime.title_english || anime.title}
                      </span>

                      <div className="flex gap-3">
                        <div className="flex gap-1 items-center">
                          <FaStar className="w-3 h-3 text-myYellow" />
                          <span className="text-myYellow text-sm">{anime.score || 'Unknown'}</span>
                        </div>
                        <span className="text-sm">{anime.type}</span>
                        <div className="flex gap-1 items-center">
                          <span className="text-sm">{anime.aired.string || 'Unknown'}</span>
                        </div>
                      </div>
                    </div>
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
