
import React from "react";
import { useLocation } from "@/contexts/LocationContext";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const LocationIndicator = () => {
  const { userLocation, isLoading, setCustomLocation } = useLocation();
  const [customLocation, setCustomLocationInput] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple parsing for "City, State, Country" format
    const parts = customLocation.split(",").map(part => part.trim());
    
    const locationUpdate: {city?: string, state?: string, country?: string} = {};
    
    if (parts.length >= 1) locationUpdate.city = parts[0];
    if (parts.length >= 2) locationUpdate.state = parts[1];
    if (parts.length >= 3) locationUpdate.country = parts[2];
    
    setCustomLocation(locationUpdate);
  };

  if (isLoading) {
    return (
      <div className="flex items-center text-sm text-gray-500">
        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
        <span>Locating...</span>
      </div>
    );
  }

  const locationText = userLocation.city
    ? `${userLocation.city}${userLocation.state ? `, ${userLocation.state}` : ""}`
    : "Location not available";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center text-xs gap-1 h-auto py-1">
          <MapPin className="h-3 w-3 text-muslim-teal" />
          <span className="truncate max-w-[100px]">{locationText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Your Location</h4>
            <p className="text-sm text-gray-500">
              {userLocation.city && userLocation.state 
                ? `${userLocation.city}, ${userLocation.state}, ${userLocation.country}` 
                : "We couldn't detect your location automatically."}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-2">
            <h4 className="font-medium mb-1">Set Custom Location</h4>
            <div className="flex gap-2">
              <Input 
                placeholder="City, State, Country" 
                value={customLocation}
                onChange={(e) => setCustomLocationInput(e.target.value)}
                className="text-sm"
              />
              <Button type="submit" size="sm">Apply</Button>
            </div>
            <p className="text-xs text-gray-500">
              Enter a location to see local businesses and mosques
            </p>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationIndicator;
