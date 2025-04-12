
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BadgePercent, Rocket, Users } from "lucide-react";

const BetaProgramBanner = () => {
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
  
  // Simulate spots being taken
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft(prev => Math.max(prev - Math.floor(Math.random() * 2), 0));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-muslim-gold/10 relative rounded-lg overflow-hidden border border-muslim-gold/50 shadow-lg p-6 mb-8 mt-4 backdrop-blur-sm">
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-muslim-gold/20 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-muslim-gold/20 rounded-full animate-pulse"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-center mb-2">
            <Badge className="bg-muslim-gold/90 text-muslim-dark">Beta Program</Badge>
            <Rocket className="h-5 w-5 text-muslim-gold ml-2" />
          </div>
          <h2 className="text-2xl font-bold text-muslim-dark mb-2">Launch Special: 20% OFF!</h2>
          <p className="mb-4">
            Join our exclusive beta program and get <span className="font-bold text-muslim-teal">20% off</span> your business membership.
            Limited to the first 100 businesses in each city!
          </p>
          <div className="flex items-center text-muslim-dark">
            <Users className="h-4 w-4 mr-1" />
            <span className="font-medium">{spotsLeft} spots remaining</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-center font-medium text-gray-700 mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muslim-gold" />
            <span>Offer ends in:</span>
          </div>
          <div className="flex space-x-2">
            <div className="text-center">
              <div className="bg-muslim-gold/10 rounded-md p-2 w-16">
                <span className="text-2xl font-bold text-muslim-dark">{countdown.days}</span>
              </div>
              <span className="text-xs text-gray-500">Days</span>
            </div>
            <div className="text-center">
              <div className="bg-muslim-gold/10 rounded-md p-2 w-16">
                <span className="text-2xl font-bold text-muslim-dark">{countdown.hours}</span>
              </div>
              <span className="text-xs text-gray-500">Hours</span>
            </div>
            <div className="text-center">
              <div className="bg-muslim-gold/10 rounded-md p-2 w-16">
                <span className="text-2xl font-bold text-muslim-dark">{countdown.minutes}</span>
              </div>
              <span className="text-xs text-gray-500">Mins</span>
            </div>
          </div>
          
          <Link to="/membership">
            <Button className="mt-4 bg-muslim-gold text-muslim-dark hover:bg-muslim-gold/80 flex items-center gap-2">
              <BadgePercent className="h-4 w-4" />
              Claim 20% Discount
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BetaProgramBanner;
