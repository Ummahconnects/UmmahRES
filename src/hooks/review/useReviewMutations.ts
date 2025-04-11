
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ReviewItemProps, SubmitReviewData } from "@/types/reviewTypes";
import { createNewReviewObject, calculateAverageRating } from "@/utils/reviewUtils";

interface UseReviewMutationsProps {
  reviews: ReviewItemProps[];
  setReviews: (reviews: ReviewItemProps[]) => void;
  averageRating: number;
  totalReviews: number;
  setAverageRating: (rating: number) => void;
  setTotalReviews: (count: number) => void;
  entityId?: string;
}

export function useReviewMutations({
  reviews,
  setReviews,
  averageRating,
  totalReviews,
  setAverageRating,
  setTotalReviews,
  entityId
}: UseReviewMutationsProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async (review: SubmitReviewData, userId: string) => {
    if (!userId) return false;
    
    try {
      setSubmitting(true);
      
      if (!entityId) {
        // For mock data
        const newReview = createNewReviewObject(`user-${Date.now()}`, review.rating, review.comment, userId);
        
        setReviews([newReview, ...reviews]);
        
        // Update average
        const newTotal = totalReviews + 1;
        const newAverage = ((averageRating * totalReviews) + review.rating) / newTotal;
        setAverageRating(newAverage);
        setTotalReviews(newTotal);
        
        toast({
          title: "Success",
          description: "Your review has been submitted. Jazakallah khair!",
        });
        
        return true;
      }
      
      // Add review to database with type assertion
      const { data, error } = await supabase
        .from("reviews" as any)
        .insert({
          business_id: entityId,
          user_id: userId,
          rating: review.rating,
          comment: review.comment
        })
        .select() as any;
        
      if (error) throw error;
      
      // Add to local state
      const newReview = createNewReviewObject(data[0].id, review.rating, review.comment, userId);
      
      setReviews([newReview, ...reviews]);
      
      // Update average
      const newTotal = totalReviews + 1;
      const newAverage = ((averageRating * totalReviews) + review.rating) / newTotal;
      setAverageRating(newAverage);
      setTotalReviews(newTotal);
      
      toast({
        title: "Success",
        description: "Your review has been submitted. Jazakallah khair!",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteReview = (id: string) => {
    const updatedReviews = reviews.filter(review => review.id !== id);
    setReviews(updatedReviews);
    
    // Recalculate average
    if (updatedReviews.length > 0) {
      const newAverageRating = calculateAverageRating(updatedReviews);
      setAverageRating(newAverageRating);
    } else {
      setAverageRating(0);
    }
    
    setTotalReviews(updatedReviews.length);
  };

  return {
    submitReview,
    deleteReview,
    submitting
  };
}
