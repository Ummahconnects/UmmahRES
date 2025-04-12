
import { Star, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BusinessProps } from "@/components/BusinessCard";

const BusinessListItem = (business: BusinessProps) => {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
      <div className="sm:w-48 h-48 sm:h-auto overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{business.name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-muslim-gold">
                <Star className="h-4 w-4 fill-muslim-gold" />
                <span className="ml-1 text-sm font-medium">{business.rating.toFixed(1)}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">{business.category}</span>
            </div>
          </div>
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded",
            business.isOpen 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            {business.isOpen ? "Open" : "Closed"}
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-500">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
            <span>{business.address}</span>
          </div>
          {business.phone && (
            <div className="flex items-center mt-1">
              <Phone className="h-4 w-4 mr-1" />
              <span>{business.phone}</span>
            </div>
          )}
        </div>
        {business.services && business.services.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {business.services.map((service) => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessListItem;
