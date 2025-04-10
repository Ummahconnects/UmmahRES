
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BusinessProps {
  id: string;
  name: string;
  category: string;
  address: string;
  rating: number;
  image: string;
  phone?: string;
  isOpen?: boolean;
  featured?: boolean;
  services?: string[];
}

const BusinessCard = ({
  id,
  name,
  category,
  address,
  rating,
  image,
  phone,
  isOpen = true,
  featured = false,
  services = []
}: BusinessProps) => {
  return (
    <Link to={`/business/${id}`} className={cn(
      "block rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow",
      featured && "ring-2 ring-muslim-gold"
    )}>
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-muslim-gold text-white">Featured</Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-2">
          <div className="flex items-center text-white">
            <Star className="h-4 w-4 mr-1 fill-muslim-gold text-muslim-gold" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
            <Badge
              variant="outline"
              className="mt-1 text-xs"
            >
              {category}
            </Badge>
          </div>
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded",
            isOpen 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            {isOpen ? "Open" : "Closed"}
          </div>
        </div>
        <div className="mt-3 space-y-1 text-sm text-gray-500">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{address}</span>
          </div>
          {phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{phone}</span>
            </div>
          )}
        </div>
        {services.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {services.slice(0, 3).map((service) => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {services.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{services.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default BusinessCard;
