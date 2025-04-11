
import { useState } from "react";
import { useReviewQuery } from "./useReviewQuery";
import { useReviewMutations } from "./useReviewMutations";
import { SubmitReviewData } from "@/types/reviewTypes";

export function useReviews(entityId?: string) {
  const {
    reviews,
    loading,
    averageRating,
    totalReviews,
    setReviews
  } = useReviewQuery(entityId);
  
  const [localAverageRating, setLocalAverageRating] = useState(averageRating);
  const [localTotalReviews, setLocalTotalReviews] = useState(totalReviews);
  
  // Sync local state with query results
  if (averageRating !== localAverageRating) {
    setLocalAverageRating(averageRating);
  }
  
  if (totalReviews !== localTotalReviews) {
    setLocalTotalReviews(totalReviews);
  }
  
  const {
    submitReview,
    deleteReview,
    submitting
  } = useReviewMutations({
    reviews,
    setReviews,
    averageRating: localAverageRating,
    totalReviews: localTotalReviews,
    setAverageRating: setLocalAverageRating,
    setTotalReviews: setLocalTotalReviews,
    entityId
  });

  return {
    reviews,
    loading,
    averageRating: localAverageRating,
    totalReviews: localTotalReviews,
    submitReview,
    deleteReview,
    submitting
  };
}

// Re-export types for convenience
export type { SubmitReviewData } from "@/types/reviewTypes";
