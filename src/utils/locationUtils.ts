
// Location utilities for geo-fencing and location-based filtering

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationData {
  city?: string;
  state?: string;
  country?: string;
  coordinates?: Coordinates;
}

let cachedLocation: LocationData | null = null;

/**
 * Get the user's current location using browser geolocation API
 */
export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
};

/**
 * Get location data based on coordinates using reverse geocoding
 */
export const getLocationDataFromCoordinates = async (
  coordinates: Coordinates
): Promise<LocationData> => {
  try {
    // In a production app, you would use a geocoding service like Google Maps, Mapbox, etc.
    // For this example, we're using a free service
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json`
    );
    
    const data = await response.json();
    
    return {
      city: data.address?.city || data.address?.town || data.address?.village,
      state: data.address?.state,
      country: data.address?.country,
      coordinates
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    // Return coordinates even if geocoding fails
    return { coordinates };
  }
};

/**
 * Get user's location data, with caching
 */
export const getUserLocationData = async (): Promise<LocationData> => {
  if (cachedLocation) {
    return cachedLocation;
  }

  try {
    const coordinates = await getCurrentLocation();
    const locationData = await getLocationDataFromCoordinates(coordinates);
    
    // Cache the location data
    cachedLocation = locationData;
    
    return locationData;
  } catch (error) {
    console.error("Could not get user location:", error);
    return {};
  }
};

/**
 * Calculate distance between two coordinates using the Haversine formula
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Check if an item is within the specified radius of the user
 */
export const isWithinRadius = (
  userLat: number,
  userLon: number,
  itemLat: number,
  itemLon: number,
  radiusKm: number = 50 // Default radius: 50km
): boolean => {
  const distance = calculateDistance(userLat, userLon, itemLat, itemLon);
  return distance <= radiusKm;
};

/**
 * Filter array of items by location proximity
 */
export const filterByLocation = <T extends { latitude?: number; longitude?: number }>(
  items: T[],
  userLocation: Coordinates,
  radiusKm: number = 50
): T[] => {
  if (!userLocation.latitude || !userLocation.longitude) {
    return items;
  }

  return items.filter(item => {
    if (!item.latitude || !item.longitude) {
      return false;
    }
    
    return isWithinRadius(
      userLocation.latitude,
      userLocation.longitude,
      item.latitude,
      item.longitude,
      radiusKm
    );
  });
};
