
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { ReviewItemProps } from "./ReviewItem";
import { SubmitReviewData } from "@/hooks/useReviews";
import { useAuth } from "@/contexts/AuthContext";

interface ReviewTabsProps {
  isWritingReview: boolean;
  setIsWritingReview: (isWriting: boolean) => void;
  reviews: ReviewItemProps[];
  entityId?: string;
  reviewPrompt: string;
  onSubmitReview: (review: SubmitReviewData) => void;
}

const ReviewTabs = ({
  isWritingReview,
  setIsWritingReview,
  reviews,
  entityId,
  reviewPrompt,
  onSubmitReview
}: ReviewTabsProps) => {
  const { user } = useAuth();

  return (
    <Tabs 
      defaultValue={isWritingReview ? "write" : "read"} 
      value={isWritingReview ? "write" : "read"}
    >
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
        <ReviewForm 
          onSubmit={onSubmitReview} 
          placeholderText={reviewPrompt} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ReviewTabs;
