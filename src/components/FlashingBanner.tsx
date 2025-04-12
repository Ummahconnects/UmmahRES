
import React, { useState } from 'react';
import { AlertTriangle, Circle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface FlashingBannerProps {
  message: string;
  icon?: React.ReactNode;
  colorScheme?: 'primary' | 'warning' | 'info';
  className?: string;
}

const FlashingBanner = ({ 
  message, 
  icon = <AlertTriangle className="h-4 w-4" />, 
  colorScheme = 'primary',
  className = '' 
}: FlashingBannerProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const getColorClasses = () => {
    switch (colorScheme) {
      case 'warning':
        return 'bg-amber-100 border-amber-400 text-amber-800';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-800';
      default: // primary
        return 'bg-muslim-teal/10 border-muslim-teal/30 text-muslim-teal';
    }
  };

  return (
    <Alert 
      className={`flex items-center p-3 rounded-md ${getColorClasses()} ${className}`}
    >
      <div className="flex items-center w-full">
        <Circle className="h-4 w-4 text-red-500 mr-2 animate-[spin_3s_linear_infinite]" />
        <span className="mr-2">{icon}</span>
        <AlertDescription className="text-sm font-medium m-0">{message}</AlertDescription>
        <Circle className="h-4 w-4 text-red-500 ml-auto mr-2 animate-[spin_3s_linear_infinite]" />
        <button 
          onClick={() => setVisible(false)} 
          className="text-sm font-medium hover:opacity-75"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </Alert>
  );
};

export default FlashingBanner;
