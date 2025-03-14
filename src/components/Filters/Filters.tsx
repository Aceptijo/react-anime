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
import useGenresStore from '@/store/GenresStore.ts';
import useAnimeStore from '@/store/AnimeStore.ts';
import * as React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';

const FILTER_TYPES = ['OVA', 'TV', 'ONA'];
const FILTER_STATUSES = ['Airing', 'Completed', 'Upcoming'];

type FiltersProps = {
  currentPage: number;
};

const Filters: React.FC<FiltersProps> = ({ currentPage }) => {
  const { genres } = useGenresStore();
  const { fetchAnime, setFilters, filters } = useAnimeStore();

  return (
    <div className="flex h-full w-1/5 gap-5">
      <div className="flex w-full flex-col items-start gap-5 rounded-xl bg-secondaryBg px-3 py-3">
        <div className="flex w-full flex-col items-start gap-2">
          <span className="font-medium">Genres</span>

          <Select
            value={filters.genres || ''}
            onValueChange={(value) => setFilters({ genres: value })}
          >
            <SelectTrigger className="bg-primary border-none">
              <SelectValue placeholder="Select genres" />
            </SelectTrigger>
            <SelectContent className="bg-primary">
              {genres.map((genre) => (
                <SelectItem value={`${genre.mal_id}`} key={genre.mal_id}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-start gap-2">
          <span className="font-medium">Year</span>
          <div className="flex gap-3">
            <Input
              placeholder="From"
              value={filters.yearFrom}
              onChange={(e) => setFilters({ yearFrom: e.target.value })}
              className="border-none bg-primary text-foreground placeholder:text-input"
            />
            <Input
              placeholder="To"
              value={filters.yearTo}
              onChange={(e) => setFilters({ yearTo: e.target.value })}
              className="border-none bg-primary text-foreground placeholder:text-input"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="flex w-full justify-between">
            <span className="font-medium">Score</span>
            <span className="text-secondary font-medium">{filters.score}</span>
          </div>
          <Slider
            max={10}
            step={0.5}
            value={[filters.score]}
            onValueChange={(value) => setFilters({ score: value[0] })}
            className="bg-accent rounded-xl"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <span className="text-left font-medium">Type</span>
          <RadioGroup
            value={filters.type}
            onValueChange={(value) => setFilters({ type: value })}
            className="grid grid-cols-2"
          >
            {FILTER_TYPES.map((type) => (
              <div className="flex gap-2 items-center" key={type}>
                <RadioGroupItem
                  value={type}
                  id={type}
                  className="text-secondary border border-primary data-[state=checked]:border-secondary"
                />
                <Label htmlFor={type}>{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex w-full flex-col gap-1">
          <span className="text-left font-medium">Status</span>
          <RadioGroup
            value={filters.status}
            onValueChange={(value) => setFilters({ status: value })}
            className="grid grid-cols-2"
          >
            {FILTER_STATUSES.map((status) => (
              <div className="flex gap-2 items-center" key={status}>
                <RadioGroupItem
                  value={status}
                  id={status}
                  className="text-secondary border border-primary data-[state=checked]:border-secondary"
                />
                <Label htmlFor={status}>{status}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex justify-between w-full gap-2">
          <Button className="w-full">Clear</Button>
          <Button
            className="w-full bg-secondary hover:bg-secondary-hover font-medium text-white"
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
