
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp } from "lucide-react";

export interface ReviewItemProps {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: Date;
  helpful?: number;
  verified?: boolean;
  className?: string;
}

const ReviewItem = ({
  author,
  rating,
  comment,
  date,
  helpful = 0,
  verified = false,
  className
}: ReviewItemProps) => {
  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{author}</p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={rating} size="sm" />
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(date, { addSuffix: true })}
              </span>
              {verified && (
                <span className="text-xs bg-muslim-teal/10 text-muslim-teal px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="mt-3 text-gray-700">{comment}</p>
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>{helpful} found this helpful</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
