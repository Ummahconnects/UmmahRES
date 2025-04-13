import { useState } from "react";
import { useReviews } from "@/hooks/useReviews";
import ReviewTabs from "./ReviewTabs";
import { useMembership } from "@/hooks/useMembership";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface ReviewSectionProps {
  entityName: string;
  entityType: string;
  reviewPrompt: string;
  businessId?: string;
}

const ReviewSection = ({ 
  entityName, 
  entityType, 
  reviewPrompt,
  businessId 
}: ReviewSectionProps) => {
  const { user } = useAuth();
  const { membership } = useMembership(businessId);
  const [isWritingReview, setIsWritingReview] = useState(false);
  
  // Determine if user can access reviews based on membership
  const canAccessReviews = membership && membership.plan_type !== 'basic';
  const canSubmitReviews = membership && membership.plan_type !== 'basic';
  
  const { 
    reviews, 
    loading, 
    averageRating, 
    totalReviews, 
    submitReview, 
    submitting 
  } = useReviews(businessId);
  
  const handleSubmitReview = async (reviewData: { rating: number; comment: string }) => {
    if (!businessId) return;
    await submitReview({ ...reviewData, entityId: businessId });
    setIsWritingReview(false);
  };

  if (!canAccessReviews) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Reviews Locked</h3>
        <p className="text-gray-600 mb-4">
          Upgrade to Premium or higher to view and submit reviews
        </p>
        <Button 
          onClick={() => window.location.href = '/packages'}
          className="bg-muslim-teal hover:bg-muslim-teal/90"
        >
          Upgrade Membership
        </Button>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-muslim-dark mb-4">
        {entityName} Reviews ({totalReviews})
        <span className="ml-2 text-gray-500 text-sm">
          Average Rating: {averageRating ? averageRating.toFixed(1) : "No ratings yet"}
        </span>
      </h2>
      
      <ReviewTabs 
        isWritingReview={isWritingReview}
        setIsWritingReview={setIsWritingReview}
        reviews={reviews}
        entityId={businessId}
        reviewPrompt={reviewPrompt}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
};

export default ReviewSection;
