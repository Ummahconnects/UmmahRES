
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import IslamicQuote from "../quotes/IslamicQuote";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ReviewItemProps } from "./ReviewItem";

// Mock data
const mockReviews: ReviewItemProps[] = [
  {
    id: "1",
    author: "Ahmad S.",
    rating: 5,
    comment: "Excellent service, very professional and accommodating to my needs. Would highly recommend to others in the community.",
    date: new Date(2023, 10, 15),
    helpful: 12,
    verified: true
  },
  {
    id: "2",
    author: "Fatima K.",
    rating: 4.5,
    comment: "Great place with friendly staff. The service was prompt and they were very respectful.",
    date: new Date(2023, 11, 3),
    helpful: 8,
    verified: true
  },
  {
    id: "3",
    author: "Omar J.",
    rating: 3.5,
    comment: "Decent service but could improve on timeliness. They were professional though.",
    date: new Date(2023, 11, 20),
    helpful: 4,
    verified: false
  },
  {
    id: "4",
    author: "Aisha M.",
    rating: 5,
    comment: "MashaAllah, very impressed with the quality and attention to detail. They went above and beyond.",
    date: new Date(2024, 0, 5),
    helpful: 15,
    verified: true
  },
  {
    id: "5",
    author: "Yusuf R.",
    rating: 4,
    comment: "Good service overall. Pricing was fair and they were honest about the work needed.",
    date: new Date(2024, 1, 12),
    helpful: 6,
    verified: true
  }
];

interface ReviewSectionProps {
  entityName: string;
  entityType: "business" | "mosque";
  averageRating?: number;
  totalReviews?: number;
  className?: string;
}

const ReviewSection = ({
  entityName,
  entityType,
  averageRating = 4.5,
  totalReviews = 5,
  className
}: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<ReviewItemProps[]>(mockReviews);
  const [isWritingReview, setIsWritingReview] = useState(false);

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    const newReview: ReviewItemProps = {
      id: `user-${Date.now()}`,
      author: "You", // In a real app, this would be the user's name
      rating: review.rating,
      comment: review.comment,
      date: new Date(),
      verified: true
    };
    
    setReviews([newReview, ...reviews]);
    setIsWritingReview(false);
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
              <div className="flex flex-col items-center md:items-start">
                <div className="text-center md:text-left">
                  <div className="text-5xl font-bold text-muslim-dark">{averageRating.toFixed(1)}</div>
                  <StarRating rating={averageRating} size="lg" className="my-2" />
                  <div className="text-sm text-gray-500">Based on {totalReviews} reviews</div>
                </div>
                
                {!isWritingReview && (
                  <Button 
                    className="mt-4 bg-muslim-teal hover:bg-muslim-teal/90"
                    onClick={() => setIsWritingReview(true)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Write a Review
                  </Button>
                )}
              </div>
            </div>
            
            <div className="md:col-span-1">
              <IslamicQuote />
            </div>
          </div>
          
          <Tabs defaultValue={isWritingReview ? "write" : "read"} value={isWritingReview ? "write" : "read"}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="read" 
                onClick={() => setIsWritingReview(false)}
              >
                Read Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="write"
                onClick={() => setIsWritingReview(true)}
              >
                Write a Review
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="read" className="mt-6">
              <ReviewList reviews={reviews} />
            </TabsContent>
            
            <TabsContent value="write" className="mt-6">
              <ReviewForm onSubmit={handleReviewSubmit} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSection;
