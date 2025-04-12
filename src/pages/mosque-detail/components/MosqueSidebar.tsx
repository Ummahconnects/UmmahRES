
import { MapPin, Phone, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { MosqueProps } from "@/components/MosqueCard";

interface MosqueSidebarProps {
  mosque: MosqueProps;
}

const MosqueSidebar = ({ mosque }: MosqueSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Facilities & Services</h2>
          {mosque.facilities && mosque.facilities.length > 0 ? (
            <ul className="space-y-2">
              {mosque.facilities.map(facility => (
                <li key={facility} className="flex items-start">
                  <Check className="h-5 w-5 text-muslim-teal mr-2 shrink-0 mt-0.5" />
                  <span>{facility}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No facilities information available</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-muslim-teal mr-2 shrink-0 mt-0.5" />
              <span>{mosque.address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-muslim-teal mr-2" />
              <span>+61 8 1234 5678</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-muslim-teal mr-2" />
              <a href="#" className="text-muslim-teal hover:underline">Visit Website</a>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button className="w-full">Get Directions</Button>
      </div>
    </div>
  );
};

export default MosqueSidebar;
