
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ReviewStatsProps {
  averageRating: number;
  totalReviews: number;
  onWriteReviewClick: () => void;
}

const ReviewStats = ({ 
  averageRating, 
  totalReviews, 
  onWriteReviewClick 
}: ReviewStatsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSignInToReview = () => {
    toast({
      title: "Authentication required",
      description: "Please sign in to write a review",
    });
  };

  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="text-center md:text-left">
        <div className="text-5xl font-bold text-muslim-dark">{averageRating.toFixed(1)}</div>
        <StarRating rating={averageRating} size="lg" className="my-2" />
        <div className="text-sm text-gray-500">Based on {totalReviews} reviews</div>
      </div>
      
      {user && (
        <Button 
          className="mt-4 bg-muslim-teal hover:bg-muslim-teal/90"
          onClick={onWriteReviewClick}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Write a Review
        </Button>
      )}
      
      {!user && (
        <Button 
          className="mt-4"
          variant="outline"
          onClick={handleSignInToReview}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Sign in to Review
        </Button>
      )}
    </div>
  );
};

export default ReviewStats;
