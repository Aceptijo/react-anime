import { useParams } from 'react-router-dom';
import useAnimeByIdStore from '@/store/AnimeByIdStore.ts';
import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const CatalogItem = () => {
  const { id } = useParams();
  const { fetchById, fetchedAnime } = useAnimeByIdStore();
  const animeInfoLabels = [
    'Type',
    'Episodes',
    'Genres',
    'Aired',
    'Status',
    'Season',
    'Source',
    'Rating',
    'Duration',
  ];

  useEffect(() => {
    fetchById(Number(id));
  }, [id]);

  return (
    <div className="mt-20 w-full">
      <div className="flex gap-5">
        <img
          className="rounded-xl"
          src={`${fetchedAnime?.images.jpg.large_image_url}`}
          alt={`${fetchedAnime?.title_english}`}
        />
        <div className="bg-secondaryBg flex w-full rounded-xl p-5">
          <div className="flex basis-1/2 flex-col gap-5 text-left">
            <span className="text-lg font-bold">{fetchedAnime?.title_english}</span>
            <div className="flex items-center gap-1 text-lg text-myYellow">
              <StarRoundedIcon />
              <span>{`${fetchedAnime?.score} (${fetchedAnime?.scored_by})`}</span>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col gap-3 text-gray-500">
                {animeInfoLabels.map((label) => (
                  <span>{label}</span>
                ))}
              </div>
              <div className="flex flex-col justify-between gap-3">
                <span>{fetchedAnime?.type}</span>
                <span>{fetchedAnime?.episodes}</span>
                <div className="flex gap-2">
                  {fetchedAnime?.genres.map((genre) => <Badge>{genre.name}</Badge>)}
                </div>
                <span>{fetchedAnime?.aired.string}</span>
                <Badge variant="outline" className="w-fit border-secondary text-secondary">
                  {fetchedAnime?.status}
                </Badge>
                <span>{fetchedAnime?.season}</span>
                <span>{fetchedAnime?.source}</span>
                <Badge variant="outline" className="w-fit border-destructive text-destructive">
                  {fetchedAnime?.rating}
                </Badge>
                <span>{fetchedAnime?.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex basis-1/2 flex-col gap-5">
            <div className="text-left text-lg font-bold">Description</div>
            <div className="text-left">{fetchedAnime?.synopsis}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
