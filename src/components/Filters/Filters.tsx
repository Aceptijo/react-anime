import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Slider } from '@/components/ui/slider.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import useGenresStore from '@/store/genresStore.ts';
import useAnimeStore from '@/store/animeStore.ts';
import * as React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';

const FILTER_TYPES = ['OVA', 'TV', 'ONA', 'Movie', 'Music', 'Special', 'CM', 'PV'];
const FILTER_STATUSES = ['Airing', 'Complete', 'Upcoming'];
const FILTER_RATINGS = [
  { label: 'G - All Ages', value: 'g' },
  { label: 'PG - Children', value: 'pg' },
  { label: 'PG-13 - Teens 13 or older', value: 'pg13' },
  { label: 'R-17 - (violence & profanity)', value: 'r17' },
  { label: 'R+ - Mild Nudity', value: 'r' },
  { label: 'Rx - Hentai', value: 'rx' },
];

type FiltersProps = {
  currentPage: number;
};

const Filters: React.FC<FiltersProps> = ({ currentPage }) => {
  const { genres } = useGenresStore();
  const { fetchAnime, setFilters, filters, removeFilters } = useAnimeStore();

  return (
    <div className="flex h-full w-1/5 gap-5">
      <div className="flex w-full flex-col items-start gap-5 rounded-lg bg-secondaryBg px-3 py-3">
        <div className="flex w-full flex-col items-start gap-2">
          <span className="font-montserrat text-white text-sm">Genres</span>
          <Select
            value={filters.genres || ''}
            onValueChange={(value) => setFilters({ genres: value })}
          >
            <SelectTrigger className="bg-accent border-none">
              <SelectValue placeholder="Select genres" />
            </SelectTrigger>
            <SelectContent className="bg-accent text-foreground border-none">
              {genres.map((genre) => (
                <SelectItem value={`${genre.mal_id}`} key={genre.mal_id}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <span className="font-montserrat text-white text-sm">Rating</span>
          <Select
            value={filters.rating || ''}
            onValueChange={(value) => setFilters({ rating: value })}
          >
            <SelectTrigger className="bg-accent border-none">
              <SelectValue placeholder="Select rating"></SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-accent text-foreground border-none">
              {FILTER_RATINGS.map(({ label, value }) => (
                <SelectItem value={value} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-start gap-2">
          <span className="font-montserrat text-white text-sm">Year</span>
          <div className="flex gap-3">
            <Input
              placeholder="From"
              value={filters.yearFrom}
              onChange={(e) => setFilters({ yearFrom: e.target.value })}
              className="border-none bg-accent text-white"
            />
            <Input
              placeholder="To"
              value={filters.yearTo}
              onChange={(e) => setFilters({ yearTo: e.target.value })}
              className="border-none bg-accent text-white"
            />
          </div>
        </div>
        <div className=" w-full flex flex-col gap-1">
          <span className="font-montserrat text-white text-sm text-left">Score</span>
          <div className="flex gap-2 items-center">
            <Slider
              max={10}
              step={0.5}
              value={[filters.score]}
              onValueChange={(value) => setFilters({ score: value[0] })}
              className="bg-accent rounded-xl"
            />
            <span className="text-secondary text-white text-sm font-montserrat font-bold w-[30px]">
              {filters.score}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <span className="text-left font-montserrat text-white text-sm">Type</span>
          <RadioGroup
            value={filters.type}
            onValueChange={(value) => setFilters({ type: value })}
            className="grid grid-cols-2"
          >
            {FILTER_TYPES.map((type) => (
              <div className="flex gap-2 items-center " key={type}>
                <RadioGroupItem
                  value={type}
                  id={type}
                  className="text-secondary border border-primary data-[state=checked]:border-secondary data-[state=checked]:bg-secondary"
                />
                <Label htmlFor={type} className="">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex w-full flex-col gap-2">
          <span className="text-left font-montserrat text-white text-sm">Status</span>
          <RadioGroup
            value={filters.status}
            onValueChange={(value) => setFilters({ status: value })}
            className="grid grid-cols-2"
          >
            {FILTER_STATUSES.map((status) => (
              <div className="flex gap-2 items-center " key={status}>
                <RadioGroupItem
                  value={status}
                  id={status}
                  className="text-secondary border border-primary data-[state=checked]:border-secondary data-[state=checked]:bg-secondary"
                />
                <Label htmlFor={status}>{status}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex justify-between w-full gap-2">
          <Button className="w-full" onClick={removeFilters}>
            Clear
          </Button>
          <Button
            variant={'secondary'}
            className="w-full text-white"
            onClick={() => fetchAnime(currentPage)}
          >
            Find
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
