
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import IslamicQuote from "../quotes/IslamicQuote";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ReviewItemProps } from "./ReviewItem";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ReviewSectionProps {
  entityName: string;
  entityType: "business" | "mosque";
  entityId?: string; // Optional for mock data
  className?: string;
  reviewPrompt?: string;
}

const ReviewSection = ({
  entityName,
  entityType,
  entityId,
  className,
  reviewPrompt = "Share your experience..."
}: ReviewSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<ReviewItemProps[]>([]);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!entityId) {
        // For mock data or pages without a real entity ID
        setReviews([
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
        ]);
        
        // Calculate average
        setAverageRating(4.5);
        setTotalReviews(5);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Get user profile data for author names
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
          .eq("business_id", entityId)
          .order("created_at", { ascending: false });
          
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
        } else {
          setAverageRating(0);
        }
        
        setTotalReviews(formattedReviews.length);
      } catch (error: any) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [entityId]);

  const handleReviewSubmit = async (review: { rating: number; comment: string }) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a review",
        variant: "destructive",
      });
      return;
    }
    
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
      setIsWritingReview(false);
      
      toast({
        title: "Success",
        description: "Your review has been submitted. Jazakallah khair!",
      });
      
      return;
    }
    
    try {
      // Add review to database
      const { data, error } = await supabase
        .from("reviews")
        .insert({
          business_id: entityId,
          user_id: user.id,
          rating: review.rating,
          comment: review.comment
        })
        .select();
        
      if (error) throw error;
      
      // Add to local state
      const newReview: ReviewItemProps = {
        id: data[0].id,
        author: user.email?.split('@')[0] || "You",
        rating: review.rating,
        comment: review.comment,
        date: new Date(),
        verified: true,
        userId: user.id
      };
      
      setReviews([newReview, ...reviews]);
      
      // Update average
      const newTotal = totalReviews + 1;
      const newAverage = ((averageRating * totalReviews) + review.rating) / newTotal;
      setAverageRating(newAverage);
      setTotalReviews(newTotal);
      
      setIsWritingReview(false);
      
      toast({
        title: "Success",
        description: "Your review has been submitted. Jazakallah khair!",
      });
    } catch (error: any) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
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
              <div className="flex flex-col items-center md:items-start">
                <div className="text-center md:text-left">
                  <div className="text-5xl font-bold text-muslim-dark">{averageRating.toFixed(1)}</div>
                  <StarRating rating={averageRating} size="lg" className="my-2" />
                  <div className="text-sm text-gray-500">Based on {totalReviews} reviews</div>
                </div>
                
                {!isWritingReview && user && (
                  <Button 
                    className="mt-4 bg-muslim-teal hover:bg-muslim-teal/90"
                    onClick={() => setIsWritingReview(true)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Write a Review
                  </Button>
                )}
                
                {!user && (
                  <Button 
                    className="mt-4"
                    variant="outline"
                    onClick={() => toast({
                      title: "Authentication required",
                      description: "Please sign in to write a review",
                    })}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Sign in to Review
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
                disabled={!user}
              >
                Write a Review
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="read" className="mt-6">
              <ReviewList reviews={reviews} entityId={entityId} />
            </TabsContent>
            
            <TabsContent value="write" className="mt-6">
              <ReviewForm onSubmit={handleReviewSubmit} placeholderText={reviewPrompt} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSection;
