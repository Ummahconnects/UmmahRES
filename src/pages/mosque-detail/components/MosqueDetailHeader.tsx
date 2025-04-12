
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MosqueProps } from "@/components/MosqueCard";

interface MosqueDetailHeaderProps {
  mosque: MosqueProps;
}

const MosqueDetailHeader = ({ mosque }: MosqueDetailHeaderProps) => {
  return (
    <>
      <div className="mb-6">
        <Link 
          to="/mosques" 
          className="inline-flex items-center text-muslim-teal hover:text-muslim-teal/80 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Mosques
        </Link>
      </div>

      <div className="relative h-64 sm:h-96 w-full rounded-lg overflow-hidden">
        <img
          src={mosque.image}
          alt={mosque.name}
          className="w-full h-full object-cover"
        />
        {mosque.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-muslim-gold text-white">Featured</Badge>
          </div>
        )}
        <div className={cn(
          "absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium",
          mosque.isOpen ? "bg-green-500" : "bg-red-500"
        )}>
          {mosque.isOpen ? "Open" : "Closed"}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-muslim-dark">{mosque.name}</h1>
        <div className="mt-2 flex items-center space-x-2">
          <Badge variant="outline">{mosque.type}</Badge>
          <div className="text-gray-500 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {mosque.address}
          </div>
        </div>
      </div>
    </>
  );
};

export default MosqueDetailHeader;
