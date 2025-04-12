
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ReviewItemProps, mockReviews } from "@/types/reviewTypes";
import { formatReviewData, calculateAverageRating } from "@/utils/reviewUtils";

export function useReviewQuery(entityId?: string) {
  const [reviews, setReviews] = useState<ReviewItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [entityId]);

  const fetchReviews = async () => {
    if (!entityId) {
      // Use mock data if no entityId provided
      setReviews(mockReviews);
      setAverageRating(4.5);
      setTotalReviews(mockReviews.length);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Get user profile data for author names
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id,
          rating,
          comment,
          created_at,
          user_id,
          auth.users (email)
        `)
        .eq("business_id", entityId);
        
      if (error) throw error;
      
      // Transform data for our component
      const formattedReviews = formatReviewData(data);
      
      setReviews(formattedReviews);
      
      // Calculate average rating
      if (formattedReviews.length > 0) {
        setAverageRating(calculateAverageRating(formattedReviews));
      }
      
      setTotalReviews(formattedReviews.length);
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    averageRating,
    totalReviews,
    setReviews
  };
}
