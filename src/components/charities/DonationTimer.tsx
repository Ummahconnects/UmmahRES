
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface DonationTimerProps {
  endDate: Date;
  goalAmount: number;
  currentAmount: number;
}

const DonationTimer = ({ endDate, goalAmount, currentAmount }: DonationTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isExpired, setIsExpired] = useState(false);
  
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    };
    
    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());
    
    // Update timer every second
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
      
      if (remaining.days === 0 && remaining.hours === 0 && 
          remaining.minutes === 0 && remaining.seconds === 0) {
        clearInterval(timer);
        setIsExpired(true);
      }
    }, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center mb-2 text-gray-600">
        <Clock className="mr-2 h-4 w-4" />
        {isExpired ? (
          <span className="font-medium text-red-500">Campaign Ended</span>
        ) : (
          <span className="font-medium">Time Remaining</span>
        )}
      </div>
      
      {!isExpired && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center">
            <div className="bg-gray-100 rounded-md p-2">
              <span className="text-lg font-bold">{timeRemaining.days}</span>
            </div>
            <span className="text-xs text-gray-500">Days</span>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-md p-2">
              <span className="text-lg font-bold">{timeRemaining.hours}</span>
            </div>
            <span className="text-xs text-gray-500">Hours</span>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-md p-2">
              <span className="text-lg font-bold">{timeRemaining.minutes}</span>
            </div>
            <span className="text-xs text-gray-500">Mins</span>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-md p-2">
              <span className="text-lg font-bold">{timeRemaining.seconds}</span>
            </div>
            <span className="text-xs text-gray-500">Secs</span>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">${currentAmount.toLocaleString()} raised</span>
          <span className="text-sm text-gray-500">Goal: ${goalAmount.toLocaleString()}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="text-right text-xs text-gray-500">{progressPercentage}% of goal</div>
      </div>
    </div>
  );
};

export default DonationTimer;
