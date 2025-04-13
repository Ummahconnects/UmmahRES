
import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Wind } from "lucide-react";

// Mock weather data
const MOCK_WEATHER = {
  city: "Perth",
  temperature: 28,
  condition: "Sunny",
  humidity: 45,
  wind: 12
};

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className="h-10 w-10 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="h-10 w-10 text-gray-400" />;
    case 'rainy':
      return <CloudRain className="h-10 w-10 text-blue-400" />;
    default:
      return <Sun className="h-10 w-10 text-yellow-500" />;
  }
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(MOCK_WEATHER);
  const [isOffline, setIsOffline] = useState(false);
  
  // Check if app is offline
  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    
    setIsOffline(!navigator.onLine);
    
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);
  
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{weather.temperature}°C</h3>
          <p className="text-gray-500">{weather.city}</p>
        </div>
        {getWeatherIcon(weather.condition)}
      </div>
      
      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Wind className="h-4 w-4 mr-1" />
          <span>{weather.wind} km/h</span>
        </div>
        <div>
          <span>Humidity: {weather.humidity}%</span>
        </div>
      </div>
      
      {isOffline && (
        <div className="text-xs bg-yellow-50 text-yellow-800 p-2 rounded-md mt-2">
          <span>You're offline. Weather data may not be current.</span>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
