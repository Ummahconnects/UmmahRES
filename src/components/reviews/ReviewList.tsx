
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
  entityId?: string;
  className?: string;
}

const ReviewList = ({ reviews, entityId, className }: ReviewListProps) => {
  const [sortBy, setSortBy] = useState("recent");
  const [displayCount, setDisplayCount] = useState(3);
  const [reviewList, setReviewList] = useState<ReviewItemProps[]>(reviews);

  const sortedReviews = [...reviewList].sort((a, b) => {
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
  const hasMoreReviews = displayCount < reviewList.length;

  const handleDeleteReview = (id: string) => {
    const updatedReviews = reviewList.filter(review => review.id !== id);
    setReviewList(updatedReviews);
  };

  // Update reviewList when props.reviews changes
  if (JSON.stringify(reviews) !== JSON.stringify(reviewList)) {
    setReviewList(reviews);
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Reviews ({reviewList.length})</h3>
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

      {reviewList.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <ReviewItem 
              key={review.id} 
              {...review} 
              onDelete={handleDeleteReview}
              entityId={entityId}
            />
          ))}
        </div>
      )}

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
