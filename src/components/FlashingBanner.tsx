
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsFlashing(prev => !prev);
    }, 800);

    return () => clearInterval(flashInterval);
  }, []);

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
      className={`transition-all duration-300 ${isFlashing ? 'opacity-100 scale-[1.01]' : 'opacity-90 scale-100'} 
                 flex items-center p-3 rounded-md ${getColorClasses()} ${className}`}
    >
      <div className="flex items-center w-full">
        <span className="mr-2">{icon}</span>
        <AlertDescription className="text-sm font-medium m-0">{message}</AlertDescription>
        <button 
          onClick={() => setVisible(false)} 
          className="ml-auto text-sm font-medium hover:opacity-75"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </Alert>
  );
};

export default FlashingBanner;
