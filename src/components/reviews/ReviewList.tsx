
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReviewItem, { ReviewItemProps } from "./ReviewItem";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ReviewListProps {
  reviews: ReviewItemProps[];
  className?: string;
}

const ReviewList = ({ reviews, className }: ReviewListProps) => {
  const [sortBy, setSortBy] = useState("recent");
  const [displayCount, setDisplayCount] = useState(3);

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.date.getTime() - a.date.getTime();
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      case "helpful":
        return (b.helpful || 0) - (a.helpful || 0);
      default:
        return 0;
    }
  });

  const displayedReviews = sortedReviews.slice(0, displayCount);
  const hasMoreReviews = displayCount < reviews.length;

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Reviews ({reviews.length})</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="rating-high">Highest Rating</SelectItem>
            <SelectItem value="rating-low">Lowest Rating</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <ReviewItem key={review.id} {...review} />
        ))}
      </div>

      {hasMoreReviews && (
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={() => setDisplayCount(prev => prev + 3)}
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
