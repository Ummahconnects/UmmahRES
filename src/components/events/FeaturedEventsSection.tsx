
import { Sparkles } from "lucide-react";
import EventBookingGrid from "./EventBookingGrid";

const FeaturedEventsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-muslim-light/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-muslim-teal/20 to-muslim-blue/20 text-muslim-dark font-medium text-sm mb-4">
            <Sparkles className="h-4 w-4 mr-2 text-muslim-gold" />
            FEATURED LOCAL EVENTS
          </div>
          
          <h2 className="text-3xl font-bold text-muslim-dark mb-4">
            Upcoming Community Events
          </h2>
          
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover and book local events happening in your Muslim community. From workshops to festivals, 
            reserve your spot for these enriching gatherings.
          </p>
        </div>
        
        <EventBookingGrid />
      </div>
    </section>
  );
};

export default FeaturedEventsSection;
