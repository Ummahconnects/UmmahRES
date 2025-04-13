
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useLocation } from "@/contexts/LocationContext";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchBarProps {
  type?: "business" | "mosque";
  className?: string;
}

const SearchBar = ({ type = "business", className }: SearchBarProps) => {
  const navigate = useNavigate();
  const { userLocation } = useLocation();
  
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [localOnly, setLocalOnly] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    if (keyword) searchParams.append("keyword", keyword);
    if (category) searchParams.append("category", category);
    
    // Add location parameters if localOnly is selected
    if (localOnly && userLocation.city) {
      searchParams.append("localOnly", "true");
      if (userLocation.city) searchParams.append("city", userLocation.city);
      if (userLocation.state) searchParams.append("state", userLocation.state);
      if (userLocation.country) searchParams.append("country", userLocation.country);
      if (userLocation.coordinates?.latitude) {
        searchParams.append("latitude", userLocation.coordinates.latitude.toString());
        searchParams.append("longitude", userLocation.coordinates.longitude.toString());
      }
    }
    
    navigate(`/${type === "business" ? "businesses" : "mosques"}?${searchParams.toString()}`);
  };

  const businessCategories = [
    "All Categories",
    "Restaurants",
    "Grocery",
    "Healthcare",
    "Professional Services",
    "Education",
    "Retail",
    "Finance",
    "Technology"
  ];

  const mosqueCategories = [
    "All Mosques",
    "Sunni Mosques",
    "Shia Mosques",
    "Islamic Centers",
    "Prayer Spaces"
  ];

  const categories = type === "business" ? businessCategories : mosqueCategories;
  
  const locationLabel = userLocation.city 
    ? `${userLocation.city}${userLocation.state ? `, ${userLocation.state}` : ""}` 
    : "your local area";

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search ${type === "business" ? "businesses" : "mosques"}...`}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="md:w-56">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="bg-muslim-teal hover:bg-muslim-teal/90"
          >
            Search
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="localOnly" 
            checked={localOnly}
            onCheckedChange={(checked) => {
              if (typeof checked === 'boolean') {
                setLocalOnly(checked);
              }
            }}
          />
          <label 
            htmlFor="localOnly" 
            className="text-sm flex items-center cursor-pointer"
          >
            <MapPin className="h-3 w-3 mr-1 text-muslim-teal" />
            Show results from {locationLabel}
          </label>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
