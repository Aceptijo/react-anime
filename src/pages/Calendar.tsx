import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { useEffect, useState } from 'react';
import useSchedulesStore from '@/store/schedulesStore.ts';
import AnimeCard from '@/components/AnimeCard/AnimeCard.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const Calendar = () => {
  const [scheduledDay, setScheduledDay] = useState<string>('monday');
  const { isLoading, fetchAnimeSchedule, scheduledAnime } = useSchedulesStore();
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleDayChange = (day: string) => {
    setScheduledDay(day);
  };

  useEffect(() => {
    fetchAnimeSchedule(scheduledDay);
  }, [scheduledDay]);

  return (
    <div className="mt-24">
      <div className="flex flex-col gap-5">
        <Tabs defaultValue={scheduledDay}>
          <TabsList className="flex h-full w-full gap-2 justify-between bg-secondaryBg p-2 rounded-lg">
            {daysOfWeek.map((day) => (
              <TabsTrigger
                value={day}
                key={day}
                onClick={() => handleDayChange(day)}
                className="border text-sm w-full text-white border-none font-montserrat px-10 py-3 data-[state=active]:bg-secondary data-[state=active]:text-white
                "
              >
                {day.slice(0, 1).toUpperCase() + day.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {isLoading ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="h-[360px] w-[240px] bg-secondaryBg" />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="grid w-full grid-cols-5 gap-5">
              {scheduledAnime.map((anime) => (
                <AnimeCard anime={anime} key={anime.mal_id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
