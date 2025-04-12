
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Percent, Award, Users } from "lucide-react";

interface BetaOfferBannerProps {
  city?: string;
}

const BetaOfferBanner = ({ city = "your city" }: BetaOfferBannerProps) => {
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [spotsLeft, setSpotsLeft] = useState(100);
  
  // Simulate countdown for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => {
        // Calculate new countdown values
        let { days, hours, minutes, seconds } = prevCountdown;
        
        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate random spots being taken periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft(prev => {
        // Randomly decrease spots by 0-2 every interval
        const decrease = Math.floor(Math.random() * 3);
        return Math.max(prev - decrease, 0);
      });
    }, 300000); // Every 5 minutes
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="bg-gradient-to-r from-muslim-gold/20 to-muslim-teal/20 border-muslim-gold shadow-lg mb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-20 h-20 bg-muslim-gold transform -translate-x-10 -translate-y-10 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-muslim-teal transform translate-x-10 translate-y-10 rounded-full opacity-20"></div>
      
      <CardContent className="p-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:mr-4">
            <Badge className="bg-muslim-gold text-muslim-dark mb-2">Limited Time Offer</Badge>
            <h2 className="text-2xl font-bold text-muslim-dark mb-2">Beta Program Launch Special</h2>
            <p className="text-gray-700 mb-2">
              Join our exclusive beta program and receive <span className="font-bold text-muslim-teal">20% OFF</span> your membership! 
              Only available for the first 100 businesses in {city}.
            </p>
            <div className="flex items-center text-muslim-teal">
              <Users className="h-4 w-4 mr-1" />
              <span className="font-medium">{spotsLeft} spots remaining</span>
            </div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4 shadow">
            <p className="text-center font-medium text-gray-700 mb-2">Offer ends in:</p>
            <div className="flex space-x-3 justify-center items-center">
              <div className="text-center">
                <div className="bg-muslim-teal/10 rounded-md p-2 min-w-[60px]">
                  <span className="text-2xl font-bold text-muslim-teal">{countdown.days}</span>
                </div>
                <span className="text-xs text-gray-500">Days</span>
              </div>
              <div className="text-center">
                <div className="bg-muslim-teal/10 rounded-md p-2 min-w-[60px]">
                  <span className="text-2xl font-bold text-muslim-teal">{countdown.hours}</span>
                </div>
                <span className="text-xs text-gray-500">Hours</span>
              </div>
              <div className="text-center">
                <div className="bg-muslim-teal/10 rounded-md p-2 min-w-[60px]">
                  <span className="text-2xl font-bold text-muslim-teal">{countdown.minutes}</span>
                </div>
                <span className="text-xs text-gray-500">Mins</span>
              </div>
              <div className="text-center">
                <div className="bg-muslim-teal/10 rounded-md p-2 min-w-[60px]">
                  <span className="text-2xl font-bold text-muslim-teal">{countdown.seconds}</span>
                </div>
                <span className="text-xs text-gray-500">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BetaOfferBanner;
