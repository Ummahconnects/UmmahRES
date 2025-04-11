
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "./StarRating";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  onSubmit: (review: { rating: number; comment: string }) => void;
  className?: string;
  placeholderText?: string;
}

const ReviewForm = ({ 
  onSubmit, 
  className, 
  placeholderText = "Share your experience..." 
}: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }
    
    if (comment.trim().length < 10) {
      toast({
        title: "Error",
        description: "Please provide a comment with at least 10 characters",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
    
    toast({
      title: "Success",
      description: "Your review has been submitted. Jazakallah khair!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Rating
        </label>
        <StarRating 
          rating={rating} 
          readonly={false} 
          onChange={setRating} 
          size="lg" 
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          Your Review
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholderText}
          rows={4}
        />
      </div>
      
      <Button type="submit" className="bg-muslim-teal hover:bg-muslim-teal/90">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
