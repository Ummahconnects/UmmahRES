
import { Link } from "react-router-dom";
import { MapPin, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import VerificationBadge from "./business/VerificationBadge";

// Importing a default placeholder image
import placeholderMosque from '@/assets/placeholder-mosque.jpg';

export interface MosqueProps {
  id: string;
  name: string;
  type: string;
  address: string;
  image: string;
  prayerTimes?: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  jumuahTime?: string;
  isOpen?: boolean;
  featured?: boolean;
  facilities?: string[];
  communityImages?: string[];
  verified?: boolean;
  verifiedCount?: number;
}

const MosqueCard = ({
  id,
  name,
  type,
  address,
  image = placeholderMosque, // Use placeholder if no image provided
  prayerTimes,
  jumuahTime,
  isOpen = true,
  featured = false,
  facilities = [],
  verified = false,
  verifiedCount = 3
}: MosqueProps) => {
  return (
    <Link to={`/mosque/${id}`} className={cn(
      "block rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow relative group",
      featured && "ring-2 ring-muslim-gold"
    )}>
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Watermark overlay */}
        <div 
          className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none"
        >
          <span 
            className="text-white/30 text-lg sm:text-2xl font-bold tracking-widest transform -rotate-12 select-none"
          >
            TEMPORARY IMAGE
          </span>
        </div>
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-muslim-gold text-white">Featured</Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge
                variant="outline"
                className="text-xs"
              >
                {type}
              </Badge>
              {verified && (
                <VerificationBadge size="sm" verifiedCount={verifiedCount} />
              )}
            </div>
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
          {jumuahTime && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Jumu'ah: {jumuahTime}</span>
            </div>
          )}
        </div>
        {facilities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {facilities.slice(0, 3).map((facility) => (
              <Badge key={facility} variant="secondary" className="text-xs">
                {facility}
              </Badge>
            ))}
            {facilities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{facilities.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MosqueCard;
