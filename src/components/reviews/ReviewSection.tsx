
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IslamicQuote from "../quotes/IslamicQuote";
import { useAuth } from "@/contexts/AuthContext";
import { useReviews, SubmitReviewData } from "@/hooks/useReviews";
import ReviewStats from "./ReviewStats";
import ReviewTabs from "./ReviewTabs";

interface ReviewSectionProps {
  entityName: string;
  entityType: "business" | "mosque";
  entityId?: string; // Optional for mock data
  className?: string;
  reviewPrompt?: string;
  averageRating?: number; // Added prop
  totalReviews?: number; // Added prop
}

const ReviewSection = ({
  entityName,
  entityType,
  entityId,
  className,
  reviewPrompt = "Share your experience...",
  averageRating: initialAverageRating,
  totalReviews: initialTotalReviews
}: ReviewSectionProps) => {
  const { user } = useAuth();
  const [isWritingReview, setIsWritingReview] = useState(false);
  
  const {
    reviews,
    loading,
    averageRating: calculatedAverageRating,
    totalReviews: calculatedTotalReviews,
    submitReview,
    deleteReview
  } = useReviews(entityId);

  // Use provided values or calculated ones
  const displayAverageRating = initialAverageRating !== undefined ? initialAverageRating : calculatedAverageRating;
  const displayTotalReviews = initialTotalReviews !== undefined ? initialTotalReviews : calculatedTotalReviews;

  const handleReviewSubmit = async (reviewData: SubmitReviewData) => {
    if (!user) return;
    
    const success = await submitReview(reviewData, user.id);
    if (success) {
      setIsWritingReview(false);
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Reviews & Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <ReviewStats 
                averageRating={displayAverageRating} 
                totalReviews={displayTotalReviews}
                onWriteReviewClick={() => setIsWritingReview(true)}
              />
            </div>
            
            <div className="md:col-span-1">
              <IslamicQuote />
            </div>
          </div>
          
          <ReviewTabs
            isWritingReview={isWritingReview}
            setIsWritingReview={setIsWritingReview}
            reviews={reviews}
            entityId={entityId}
            reviewPrompt={reviewPrompt}
            onSubmitReview={handleReviewSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSection;
