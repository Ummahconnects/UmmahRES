
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  readonly?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  className,
  readonly = true,
  onChange
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= maxRating; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star
            key={i}
            className={cn(sizeClasses[size], "fill-amber-400 text-amber-400")}
            onClick={readonly ? undefined : () => onChange?.(i)}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className={cn(sizeClasses[size], "fill-amber-400 text-amber-400")}
            onClick={readonly ? undefined : () => onChange?.(i)}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={cn(sizeClasses[size], "text-gray-300")}
            onClick={readonly ? undefined : () => onChange?.(i)}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-1", 
        !readonly && "cursor-pointer",
        className
      )}
    >
      {renderStars()}
    </div>
  );
};

export default StarRating;
