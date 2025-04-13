
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const PrayerTimesWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Mock prayer times data
  const prayers = [
    { name: "Fajr", time: "5:24 AM" },
    { name: "Sunrise", time: "6:48 AM" },
    { name: "Dhuhr", time: "12:20 PM" },
    { name: "Asr", time: "3:45 PM" },
    { name: "Maghrib", time: "6:30 PM" },
    { name: "Isha", time: "7:45 PM" }
  ];
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Find the next prayer time
  const getNextPrayer = () => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Simple mock implementation - would be replaced with actual calculation
    if (currentHour < 5 || (currentHour === 5 && currentMinute < 24)) return "Fajr";
    if (currentHour < 12 || (currentHour === 12 && currentMinute < 20)) return "Dhuhr";
    if (currentHour < 15 || (currentHour === 15 && currentMinute < 45)) return "Asr";
    if (currentHour < 18 || (currentHour === 18 && currentMinute < 30)) return "Maghrib";
    if (currentHour < 19 || (currentHour === 19 && currentMinute < 45)) return "Isha";
    return "Fajr";
  };
  
  const nextPrayer = getNextPrayer();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-muslim-teal/10 p-3 rounded-md">
        <div>
          <h3 className="font-medium text-muslim-teal">Next Prayer</h3>
          <p className="text-2xl font-bold text-muslim-dark">{nextPrayer}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-muslim-teal">
          <Clock className="h-4 w-4" />
          <span>
            {prayers.find(p => p.name === nextPrayer)?.time}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        {prayers.map(prayer => (
          <div 
            key={prayer.name}
            className={`flex justify-between p-2 rounded ${
              prayer.name === nextPrayer 
                ? "bg-muslim-teal/10 font-medium" 
                : "hover:bg-gray-50"
            }`}
          >
            <span>{prayer.name}</span>
            <span>{prayer.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimesWidget;
