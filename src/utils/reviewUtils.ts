
import { ReviewData, ReviewItemProps } from "@/types/reviewTypes";

// Transform review data from API to component format
export const formatReviewData = (reviewsData: ReviewData[]): ReviewItemProps[] => {
  return reviewsData.map((review: ReviewData) => ({
    id: review.id,
    author: review.users?.email?.split('@')[0] || "Anonymous",
    rating: review.rating,
    comment: review.comment,
    date: new Date(review.created_at),
    verified: true,
    userId: review.user_id
  }));
};

// Calculate average rating from a list of reviews
export const calculateAverageRating = (reviews: ReviewItemProps[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

// Create a new review object to add to the UI
export const createNewReviewObject = (
  id: string,
  rating: number,
  comment: string,
  userId: string
): ReviewItemProps => {
  return {
    id,
    author: "You",
    rating,
    comment,
    date: new Date(),
    verified: true,
    userId
  };
};
