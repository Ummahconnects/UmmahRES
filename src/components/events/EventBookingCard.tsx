
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, CalendarCheck, AlertCircle, Globe } from "lucide-react";
import { toast } from "sonner";
import { useLocalCurrency } from "@/utils/currencyUtils";

interface EventBookingCardProps {
  eventId: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  availableSpots: number;
  price?: number; // Optional price for paid events
  imageUrl?: string; // Optional event image
}

const EventBookingCard = ({
  eventId,
  eventName,
  date,
  time,
  location,
  availableSpots,
  price,
  imageUrl
}: EventBookingCardProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [isBooked, setIsBooked] = useState(false);
  const { localCurrencyInfo, convertAndFormat, pricingFactor } = useLocalCurrency();
  
  const handleBook = () => {
    setIsBooking(true);
    
    // Simulate API call to book event
    setTimeout(() => {
      setIsBooking(false);
      setIsBooked(true);
      
      toast.success("Booking confirmed!", {
        description: `You have successfully booked ${numTickets} ticket(s) for ${eventName}`,
        action: {
          label: "View Ticket",
          onClick: () => console.log("View ticket clicked")
        }
      });
    }, 1500);
  };
  
  const isPaidEvent = price !== undefined && price > 0;
  const hasRegionalPricing = pricingFactor !== 1 && isPaidEvent;
  const originalPrice = price && pricingFactor !== 1 ? price / pricingFactor : price;
  
  return (
    <Card className="overflow-hidden">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={eventName}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{eventName}</CardTitle>
        <CardDescription>Reserve your spot for this event</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muslim-teal" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muslim-teal" />
          <span>{time}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muslim-teal" />
          <span>
            {availableSpots > 0 
              ? `${availableSpots} spots available` 
              : "No spots available"}
          </span>
        </div>
        
        {isPaidEvent && (
          <div className="mt-4">
            {hasRegionalPricing && originalPrice && (
              <div className="flex items-center mb-1 gap-1 text-sm">
                <Globe className="h-3 w-3 text-muslim-blue" />
                <span className="text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
                <span className="text-muslim-teal font-medium text-xs">
                  ({pricingFactor < 1 ? `${Math.round((1 - pricingFactor) * 100)}% off` : `Regional pricing`})
                </span>
              </div>
            )}
            
            <div className="text-lg font-semibold flex items-center">
              {localCurrencyInfo.code === 'USD' ? (
                <>${price?.toFixed(2)} per ticket</>
              ) : (
                <>
                  {convertAndFormat(price || 0)} per ticket
                  <span className="text-xs text-gray-500 ml-1">
                    (${price?.toFixed(2)})
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        
        {availableSpots > 0 && !isBooked && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="tickets" className="text-sm font-medium">
                Number of tickets:
              </label>
              <select
                id="tickets"
                value={numTickets}
                onChange={(e) => setNumTickets(Number(e.target.value))}
                className="border rounded px-2 py-1"
                disabled={isBooking}
              >
                {[...Array(Math.min(availableSpots, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            
            {isPaidEvent && (
              <div className="text-sm text-gray-600 mb-2">
                Total: {localCurrencyInfo.code === 'USD' 
                  ? `$${(price! * numTickets).toFixed(2)}` 
                  : convertAndFormat(price! * numTickets)
                }
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {availableSpots > 0 ? (
          isBooked ? (
            <div className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 p-3 rounded-md">
              <CalendarCheck className="h-5 w-5" />
              <span>Booked Successfully</span>
            </div>
          ) : (
            <Button 
              className="w-full bg-muslim-teal hover:bg-muslim-teal/90" 
              onClick={handleBook}
              disabled={isBooking}
            >
              {isBooking ? "Processing..." : isPaidEvent ? "Book Now (Pay Online)" : "Reserve Your Spot"}
            </Button>
          )
        ) : (
          <div className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-700 p-3 rounded-md">
            <AlertCircle className="h-5 w-5" />
            <span>Event is Full</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventBookingCard;
