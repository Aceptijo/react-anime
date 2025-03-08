import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import useTopAnimeStore from '@/store/TopAnimeStore.ts';
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
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const Catalog = () => {
  const { topAnime, pagination, fetchTopAnime, isLoading } = useTopAnimeStore();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    fetchTopAnime(24, currentPage);
  }, [fetchTopAnime, currentPage]);

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
                  <Select>
                    <SelectTrigger className="flex gap-3 border-none text-foreground">
                      <SelectValue placeholder="Descending order" className="text-secondary" />
                    </SelectTrigger>
                    <SelectContent className="border-secondaryBg bg-secondaryBg">
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="releaseDate">Release Date</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="flex gap-3 border-none text-foreground">
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
              <div className="grid grid-cols-4 gap-5">
                {topAnime.map((anime) => (
                  <AnimeCard anime={anime} key={anime.mal_id} />
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
            <div className="flex h-full w-1/5 gap-5">
              <div className="flex w-full flex-col items-start gap-5 rounded-xl bg-secondaryBg px-3 py-3">
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="font-medium">Genres</span>
                  <Input
                    placeholder="Choose genres"
                    className="border-none bg-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="font-medium">Year</span>
                  <div className="flex gap-3">
                    <Input
                      placeholder="From"
                      className="border-none bg-accent text-foreground placeholder:text-input"
                    />
                    <Input
                      placeholder="To"
                      className="border-none bg-accent text-foreground placeholder:text-input"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <span className="text-left font-medium">Season</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label className="text-xs">Winter</Label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label className="text-xs">Summer</Label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label className="text-xs">Spring</Label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label className="text-xs">Autumn</Label>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <span className="text-left font-medium">Type</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label>OVA</Label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label>TV</Label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label>ONA</Label>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <span className="text-left font-medium">Status</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label>Ongoing</Label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label>Completed</Label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox />
                      <Label>Announcement</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
