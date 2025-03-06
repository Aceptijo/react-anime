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
  }, [fetchTopAnime]);

  return (
    <div className="mt-20">
      <div className="flex w-full gap-5">
        {isLoading ? (
          <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-5">
              <div className="flex">
                <Skeleton className="h-10 w-1/5 bg-secondaryBg" />
                <div className="flex w-full gap-3 justify-end">
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
            <Skeleton className="w-1/5 h-1/3" />
          </div>

        ) : (
          <>
            <div className="flex w-4/5 flex-col items-start gap-3">
              <div className="flex gap-3 items-start justify-between w-full">
                <div className="flex gap-3">
                  <span className="text-xl font-bold">Anime List</span>
                  <span
                    className="text-xl font-medium text-muted-foreground">{`(${pagination?.items.total})`}</span>
                </div>
                <div className="flex gap-1">
                  <Select>
                    <SelectTrigger className="flex gap-3 border-none text-foreground ">
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
              <Pagination className="mt-10">
                <PaginationContent>
                  {currentPage > 1 &&
                    <PaginationItem>
                      <PaginationPrevious href={`/react-anime/catalog?page=${currentPage - 1}`} />
                    </PaginationItem>
                  }
                  {currentPage > 3 &&
                    <>
                      <PaginationItem>
                        <PaginationLink href={`/react-anime/catalog?page=1`}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    </>
                  }
                  {currentPage > 1 &&
                    <PaginationItem>
                      <PaginationLink href={`/react-anime/catalog?page=${currentPage - 1}`}>
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem>
                  }
                  <PaginationItem>
                    <PaginationLink href={`/react-anime/catalog?page=${currentPage}`} isActive>
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  {currentPage !== pagination?.last_visible_page &&
                    <>
                      <PaginationItem>
                        <PaginationLink href={`/react-anime/catalog?page=${currentPage + 1}`}>
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href={`/react-anime/catalog?page=${pagination?.last_visible_page}`}>
                          {pagination?.last_visible_page}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href={`/react-anime/catalog?page=${currentPage + 1}`} />
                      </PaginationItem>
                    </>
                  }
                </PaginationContent>
              </Pagination>
            </div>
            <div className="flex h-full w-1/5 gap-5">
              <div
                className="gap-5 w-full rounded-xl bg-secondaryBg py-3 px-3 flex flex-col items-start">
                <div className="flex flex-col items-start w-full gap-2">
                  <span className="font-medium ">Genres</span>
                  <Input placeholder="Choose genres"
                         className="bg-accent border-none text-foreground placeholder:text-input" />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="font-medium ">Year</span>
                  <div className="flex gap-3">
                    <Input placeholder="From"
                           className="bg-accent border-none text-foreground placeholder:text-input" />
                    <Input placeholder="To"
                           className="bg-accent border-none text-foreground placeholder:text-input" />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <span className="font-medium text-left">Season</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex gap-2 ">
                      <Checkbox />
                      <Label>Winter</Label>
                    </div>
                    <div className="flex gap-2 ">
                      <Checkbox />
                      <Label>Summer</Label>
                    </div>
                    <div className="flex gap-2 ">
                      <Checkbox />
                      <Label>Spring</Label>
                    </div>
                    <div className="flex gap-2 ">
                      <Checkbox />
                      <Label>Autumn</Label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <span className="font-medium text-left">Type</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex gap-2 ">
                      <Checkbox />
                      <Label>OVA</Label>
                    </div>
                    <div className="flex gap-2 ">
                      <Checkbox />
                      <Label>TV</Label>
                    </div>
                    <div className="flex gap-2 ">
                      <Checkbox />
                      <Label>ONA</Label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <span className="font-medium text-left">Status</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex gap-2 ">
                      <Checkbox />
                      <Label>Ongoing</Label>
                    </div>
                    <div className="flex gap-2 ">
                      <Checkbox />
                      <Label>Completed</Label>
                    </div>
                    <div className="flex gap-2 ">
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
