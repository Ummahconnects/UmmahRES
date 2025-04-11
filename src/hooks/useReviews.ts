
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ReviewItemProps } from "@/components/reviews/ReviewItem";

interface ReviewData {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  users?: {
    email?: string;
  };
}

export interface SubmitReviewData {
  rating: number;
  comment: string;
}

export function useReviews(entityId?: string) {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<ReviewItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Mock data for testing or when no entityId is provided
  const mockReviews: ReviewItemProps[] = [
    {
      id: "1",
      author: "Ahmad S.",
      rating: 5,
      comment: "Excellent service, very professional and accommodating to my needs. Would highly recommend to others in the community.",
      date: new Date(2023, 10, 15),
      helpful: 12,
      verified: true,
      userId: "mock1"
    },
    {
      id: "2",
      author: "Fatima K.",
      rating: 4.5,
      comment: "Great place with friendly staff. The service was prompt and they were very respectful.",
      date: new Date(2023, 11, 3),
      helpful: 8,
      verified: true,
      userId: "mock2"
    },
    {
      id: "3",
      author: "Omar J.",
      rating: 3.5,
      comment: "Decent service but could improve on timeliness. They were professional though.",
      date: new Date(2023, 11, 20),
      helpful: 4,
      verified: false,
      userId: "mock3"
    },
    {
      id: "4",
      author: "Aisha M.",
      rating: 5,
      comment: "MashaAllah, very impressed with the quality and attention to detail. They went above and beyond.",
      date: new Date(2024, 0, 5),
      helpful: 15,
      verified: true,
      userId: "mock4"
    },
    {
      id: "5",
      author: "Yusuf R.",
      rating: 4,
      comment: "Good service overall. Pricing was fair and they were honest about the work needed.",
      date: new Date(2024, 1, 12),
      helpful: 6,
      verified: true,
      userId: "mock5"
    }
  ];

  useEffect(() => {
    fetchReviews();
  }, [entityId]);

  const fetchReviews = async () => {
    if (!entityId) {
      // Use mock data
      setReviews(mockReviews);
      setAverageRating(4.5);
      setTotalReviews(mockReviews.length);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Get user profile data for author names with type assertion
      const { data: reviewsData, error } = await supabase
        .from("reviews")
        .select(`
          id,
          rating,
          comment,
          created_at,
          user_id,
          auth.users (email)
        `)
        .eq("business_id", entityId) as unknown as { data: ReviewData[]; error: any };
        
      if (error) throw error;
      
      // Transform data for our component
      const formattedReviews = reviewsData.map((review: any) => ({
        id: review.id,
        author: review.users?.email?.split('@')[0] || "Anonymous",
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.created_at),
        verified: true,
        userId: review.user_id
      }));
      
      setReviews(formattedReviews);
      
      // Calculate average rating
      if (formattedReviews.length > 0) {
        const sum = formattedReviews.reduce((acc, review) => acc + review.rating, 0);
        setAverageRating(sum / formattedReviews.length);
      }
      
      setTotalReviews(formattedReviews.length);
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (review: SubmitReviewData, userId: string) => {
    if (!entityId) {
      // For mock data
      const newReview: ReviewItemProps = {
        id: `user-${Date.now()}`,
        author: "You",
        rating: review.rating,
        comment: review.comment,
        date: new Date(),
        verified: true,
        userId: "current-user"
      };
      
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
    
    try {
      // Add review to database with type assertion
      const { data, error } = await supabase
        .from("reviews")
        .insert({
          business_id: entityId,
          user_id: userId,
          rating: review.rating,
          comment: review.comment
        })
        .select() as unknown as { data: any[]; error: any };
        
      if (error) throw error;
      
      // Add to local state
      const newReview: ReviewItemProps = {
        id: data[0].id,
        author: "You",
        rating: review.rating,
        comment: review.comment,
        date: new Date(),
        verified: true,
        userId
      };
      
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
    }
  };

  const deleteReview = (id: string) => {
    const updatedReviews = reviews.filter(review => review.id !== id);
    setReviews(updatedReviews);
    
    // Recalculate average if needed
    if (updatedReviews.length > 0) {
      const sum = updatedReviews.reduce((acc, review) => acc + review.rating, 0);
      setAverageRating(sum / updatedReviews.length);
    } else {
      setAverageRating(0);
    }
    
    setTotalReviews(updatedReviews.length);
  };

  return {
    reviews,
    loading,
    averageRating,
    totalReviews,
    submitReview,
    deleteReview
  };
}
