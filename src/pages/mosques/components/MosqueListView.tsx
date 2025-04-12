
import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MosqueProps } from "@/components/MosqueCard";

interface MosqueListViewProps {
  mosques: MosqueProps[];
}

const MosqueListView = ({ mosques }: MosqueListViewProps) => {
  return (
    <div className="space-y-4">
      {mosques.map((mosque) => (
        <div key={mosque.id} className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
          <div className="sm:w-48 h-48 sm:h-auto overflow-hidden">
            <img
              src={mosque.image}
              alt={mosque.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{mosque.name}</h3>
                <Badge
                  variant="outline"
                  className="mt-1 text-xs"
                >
                  {mosque.type}
                </Badge>
              </div>
              <div className={cn(
                "text-xs font-medium px-2 py-1 rounded",
                mosque.isOpen 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              )}>
                {mosque.isOpen ? "Open" : "Closed"}
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
                <span>{mosque.address}</span>
              </div>
              {mosque.jumuahTime && (
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Jumu'ah: {mosque.jumuahTime}</span>
                </div>
              )}
            </div>
            {mosque.facilities && mosque.facilities.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {mosque.facilities.map((facility) => (
                  <Badge key={facility} variant="secondary" className="text-xs">
                    {facility}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MosqueListView;
