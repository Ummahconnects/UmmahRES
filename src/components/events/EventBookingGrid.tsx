
import { useLocalCurrency } from "@/utils/currencyUtils";
import EventBookingCard from "./EventBookingCard";

const BASE_EVENTS = [
  {
    id: "event-1",
    name: "Eid Festival Community Celebration",
    date: "April 20, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Central Community Park",
    availableSpots: 45,
    basePrice: 0, // Free event
    imageUrl: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "event-2",
    name: "Islamic Finance Workshop",
    date: "April 25, 2025",
    time: "6:30 PM - 8:30 PM",
    location: "Business Innovation Center",
    availableSpots: 15,
    basePrice: 25, // Paid event
    imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "event-3",
    name: "Children's Quran Competition",
    date: "May 2, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "Central Mosque",
    availableSpots: 0, // Sold out event
    basePrice: 10,
    imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "event-4",
    name: "Halal Food Festival",
    date: "May 15, 2025",
    time: "11:00 AM - 7:00 PM",
    location: "Riverside Convention Center",
    availableSpots: 120,
    basePrice: 15,
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
  }
];

const EventBookingGrid = () => {
  const { getRegionalPrice, userCountry, pricingFactor } = useLocalCurrency();
  
  // Apply regional pricing to events
  const EVENTS = BASE_EVENTS.map(event => ({
    ...event,
    // Only apply pricing factor to paid events
    price: event.basePrice > 0 ? getRegionalPrice(event.basePrice) : event.basePrice
  }));

  return (
    <div>
      {userCountry !== 'US' && pricingFactor !== 1 && (
        <div className="mb-6 p-3 bg-muslim-teal/10 rounded-md text-center backdrop-blur-sm">
          <p className="text-muslim-dark">
            {pricingFactor < 1 
              ? `Special pricing for your region! Enjoy ${Math.round((1 - pricingFactor) * 100)}% off standard prices.` 
              : `Regional pricing applied for your area.`}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.map(event => (
          <EventBookingCard
            key={event.id}
            eventId={event.id}
            eventName={event.name}
            date={event.date}
            time={event.time}
            location={event.location}
            availableSpots={event.availableSpots}
            price={event.price}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default EventBookingGrid;
