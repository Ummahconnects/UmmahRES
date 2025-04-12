
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";

interface VerificationBadgeProps {
  verifiedCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
}

const VerificationBadge = ({
  verifiedCount = 3,
  size = "md",
  className = "",
  tooltipSide = "top"
}: VerificationBadgeProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const badgeSize = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-0.5 text-xs",
    lg: "px-2.5 py-1 text-sm"
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className={`bg-green-50 border-green-200 text-green-700 flex items-center gap-1 ${badgeSize[size]} ${className}`}
          >
            <BadgeCheck className={`${sizeClasses[size]} text-green-600 fill-green-100`} />
            <span>Verified</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide} className="max-w-[200px] text-center">
          <p>Verified by {verifiedCount}+ customers</p>
          <p className="text-xs mt-1 text-gray-500">We verify all providers through customer confirmation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
