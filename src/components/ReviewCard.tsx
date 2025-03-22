import { Card, CardContent } from '@/components/ui/card.tsx';
import { IReviews } from '@/models/Reviews.ts';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';
import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft } from 'lucide-react';

type ReviewCardProps = {
  review: IReviews;
};

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Card className="bg-secondaryBg border-accent">
      <CardContent className="flex flex-col p-4">
        <div className="flex gap-5">
          <Link
            to={`${review.user.url}`}
            className="border-secondaryBg h-full border-4 rounded-md transition-all hover:bg-accent hover:border-accent"
          >
            <img
              src={review.user.images.jpg.image_url}
              alt={review.url}
              className="h-16 w-16 rounded-md object-cover"
            />
          </Link>
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex justify-between w-full">
              <Link
                to={`${review.user.url}`}
                className="font-medium transition-all hover:text-secondary"
              >
                {review.user.username}
              </Link>
              <span className="text-muted-foreground">
                {new Date(review.date).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex gap-2">
              {review.tags[0] === 'Recommended' && (
                <Button variant="secondary">
                  <AiFillLike />
                  <span>{review.tags[0]}</span>
                </Button>
              )}
              {review.tags[0] === 'Not Recommended' && (
                <Button variant="destructive">
                  <AiFillDislike />
                  <span>{review.tags[0]}</span>
                </Button>
              )}
              {review.tags[0] === 'Mixed Feelings' && (
                <Button>
                  <span>{review.tags[0]}</span>
                </Button>
              )}
              <Button className="text-myYellow">
                <FaStar />
                <span>{`Score ${review.score}/10`}</span>
              </Button>
            </div>
            <div className={`${!isOpen ? 'line-clamp-6' : ''} overflow-hidden text-sm`}>
              {review.review.split('\n').map((line, index) => (
                <p className="text-left mb-4" key={index}>
                  {line}
                </p>
              ))}
            </div>
            <Button className="self-end" onClick={handleOpen}>
              {isOpen ? (
                <ChevronLeft className="rotate-90" />
              ) : (
                <ChevronLeft className="-rotate-90" />
              )}
              {isOpen ? 'Close' : 'Open'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
