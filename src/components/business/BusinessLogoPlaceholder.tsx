
import React from "react";
import { cn } from "@/lib/utils";

interface BusinessLogoPlaceholderProps {
  icon: React.ReactNode;
  businessName: string;
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const BusinessLogoPlaceholder = ({
  icon,
  businessName,
  color,
  size = "md",
  className,
}: BusinessLogoPlaceholderProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  // Get the first letter of each word in the business name
  const initials = businessName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center",
        color,
        sizeClasses[size],
        className
      )}
    >
      {businessName ? (
        <span className="text-white font-bold">
          {initials}
        </span>
      ) : (
        <div className="text-white">
          {icon}
        </div>
      )}
    </div>
  );
};

export default BusinessLogoPlaceholder;
