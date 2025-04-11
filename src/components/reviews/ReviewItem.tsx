
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface ReviewItemProps {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: Date;
  helpful?: number;
  verified?: boolean;
  userId?: string; // Added for auth checks
  className?: string;
}

interface ReviewItemComponentProps extends ReviewItemProps {
  onDelete?: (id: string) => void;
  entityId?: string;
}

const ReviewItem = ({
  id,
  author,
  rating,
  comment,
  date,
  helpful = 0,
  verified = false,
  userId,
  className,
  onDelete,
  entityId
}: ReviewItemComponentProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const canDelete = user?.id === userId;
  
  const handleDelete = async () => {
    if (!canDelete || !entityId) return;
    
    try {
      // Add type assertion for Supabase query
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", id) as unknown as { error: any };
        
      if (error) throw error;
      
      toast({
        title: "Review deleted",
        description: "Your review has been deleted successfully",
      });
      
      if (onDelete) {
        onDelete(id);
      }
    } catch (error: any) {
      console.error("Error deleting review:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete review",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{author}</p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={rating} size="sm" />
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(date, { addSuffix: true })}
              </span>
              {verified && (
                <span className="text-xs bg-muslim-teal/10 text-muslim-teal px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
          </div>
          
          {canDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="mt-3 text-gray-700">{comment}</p>
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>{helpful} found this helpful</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
