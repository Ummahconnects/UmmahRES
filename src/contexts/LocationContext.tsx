
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUserLocationData } from "@/utils/locationUtils";

interface LocationContextType {
  userLocation: {
    city?: string;
    state?: string;
    country?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  isLoading: boolean;
  error: Error | null;
  setCustomLocation: (location: { city?: string; state?: string; country?: string }) => void;
}

const LocationContext = createContext<LocationContextType>({
  userLocation: {},
  isLoading: true,
  error: null,
  setCustomLocation: () => {},
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocation] = useState<LocationContextType["userLocation"]>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsLoading(true);
        const locationData = await getUserLocationData();
        setUserLocation(locationData);
      } catch (err) {
        console.error("Error fetching location:", err);
        setError(err instanceof Error ? err : new Error("Failed to get location"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const setCustomLocation = (location: { city?: string; state?: string; country?: string }) => {
    setUserLocation(prev => ({
      ...prev,
      ...location
    }));
  };

  return (
    <LocationContext.Provider value={{ userLocation, isLoading, error, setCustomLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
