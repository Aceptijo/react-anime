import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import AnimeCard from '@/components/AnimeCard/AnimeCard.tsx';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import Filters from '@/components/Filters/Filters.tsx';
import useAnimeStore from '@/store/AnimeStore.ts';
import useGenresStore from '@/store/GenresStore.ts';

const Catalog = () => {
  const { anime, isLoading, fetchAnime, pagination, setFilters, filters } = useAnimeStore();
  const { fetchGenres, genres } = useGenresStore();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const genreFromUrl = searchParams.get('genre') || '';
  const statusFromUrl = searchParams.get('status') || '';
  const ratingFromUrl = searchParams.get('rating') || '';

  console.log(filters);

  useEffect(() => {
    fetchAnime(currentPage);
  }, [fetchAnime, currentPage, filters.sort, filters.orderBy]);

  useEffect(() => {
    if (genreFromUrl) {
      setFilters({ genres: genreFromUrl });
    } else if (statusFromUrl) {
      setFilters({ status: statusFromUrl });
    } else if (ratingFromUrl) {
      setFilters({ rating: ratingFromUrl });
    }
  }, [genreFromUrl, statusFromUrl, ratingFromUrl]);

  useEffect(() => {
    if (genres.length === 0) {
      fetchGenres();
    }
  }, []);

  return (
    <div className="mt-20">
      <div className="flex w-full gap-5">
        {isLoading ? (
          <div className="flex w-full gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex">
                <Skeleton className="h-10 w-1/5 bg-secondaryBg" />
                <div className="flex w-full justify-end gap-3">
                  <Skeleton className="h-10 w-1/5 bg-secondaryBg" />
                  <Skeleton className="h-10 w-1/5 bg-secondaryBg" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-5">
                {Array.from({ length: 24 }).map((_, index) => (
                  <Skeleton className="h-[360px] w-[237px] bg-secondaryBg" key={index} />
                ))}
              </div>
            </div>
            <Skeleton className="h-1/3 w-1/5" />
          </div>
        ) : (
          <>
            <div className="flex w-4/5 flex-col items-start gap-3">
              <div className="flex w-full items-start justify-between gap-3">
                <div className="flex gap-3">
                  <span className="text-xl font-bold">Anime List</span>
                  <span className="text-xl font-medium text-muted-foreground">
                    {`(${pagination?.items.total})`}
                  </span>
                </div>
                <div className="flex gap-1">
                  {filters.sort === 'desc' ? (
                    <Button
                      className="hover:bg-accent active:bg-accent"
                      onClick={() => setFilters({ sort: 'asc' })}
                    >
                      <ArrowDownWideNarrow className="text-foreground" />
                    </Button>
                  ) : (
                    <Button
                      className="hover:bg-accent active:bg-accent"
                      onClick={() => setFilters({ sort: 'desc' })}
                    >
                      <ArrowDownNarrowWide className="text-foreground " />
                    </Button>
                  )}
                  <Select
                    value={filters.orderBy}
                    onValueChange={(value) => setFilters({ orderBy: value })}
                  >
                    <SelectTrigger className="flex gap-3 border-none text-foreground">
                      <SelectValue placeholder="Order by" className="text-secondary" />
                    </SelectTrigger>
                    <SelectContent className="border-secondaryBg bg-secondaryBg">
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="score">Score</SelectItem>
                      <SelectItem value="episodes">Episodes</SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="rank">Rank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-5">
                {anime.map((item) => (
                  <AnimeCard anime={item} key={item.mal_id} />
                ))}
              </div>
              {pagination?.last_visible_page && (
                <Pagination className="mt-10">
                  <PaginationContent className="text-muted-foreground">
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious to={`?page=${currentPage - 1}`} />
                      </PaginationItem>
                    )}
                    {currentPage > 2 && (
                      <>
                        <PaginationItem>
                          <PaginationLink to={`?page=1`}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationEllipsis />
                      </>
                    )}
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationLink to={`?page=${currentPage - 1}`}>
                          {currentPage - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        isActive
                        to={`?page=${currentPage}`}
                        className="border-none text-foreground bg-primary"
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>
                    {currentPage < pagination.last_visible_page && (
                      <PaginationItem>
                        <PaginationLink to={`?page=${currentPage + 1}`}>
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {currentPage < pagination.last_visible_page - 1 && (
                      <>
                        <PaginationEllipsis />
                        <PaginationItem>
                          <PaginationLink to={`?page=${pagination.last_visible_page}`}>
                            {pagination.last_visible_page}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    {currentPage < pagination.last_visible_page && (
                      <PaginationItem>
                        <PaginationNext to={`?page=${currentPage + 1}`} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </div>
            <Filters currentPage={currentPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
