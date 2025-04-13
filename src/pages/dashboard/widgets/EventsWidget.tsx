
import { useState } from "react";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Mock events data
const MOCK_EVENTS = [
  {
    id: "e1",
    title: "Friday Prayer at Perth Mosque",
    date: "Friday, April 18, 2025",
    time: "1:00 PM - 2:00 PM",
    location: "Perth Mosque, Northbridge",
    attendees: 120,
    category: "Prayer"
  },
  {
    id: "e2",
    title: "Islamic New Year Celebration",
    date: "Monday, April 21, 2025",
    time: "6:30 PM - 9:00 PM",
    location: "Islamic Centre of Western Australia",
    attendees: 250,
    category: "Celebration"
  },
  {
    id: "e3",
    title: "Quran Study Circle",
    date: "Wednesday, April 23, 2025",
    time: "7:00 PM - 8:30 PM",
    location: "Online (Zoom)",
    attendees: 45,
    category: "Education"
  }
];

const EventsWidget = () => {
  const navigate = useNavigate();
  const [events] = useState(MOCK_EVENTS);
  
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {events.map(event => (
          <div 
            key={event.id} 
            className="border rounded-md p-4 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{event.title}</h3>
              <Badge variant="outline" className="text-xs">
                {event.category}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => navigate("/community-events")}
      >
        <span>View all events</span>
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default EventsWidget;
