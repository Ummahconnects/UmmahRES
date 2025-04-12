
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface SearchBarProps {
  type?: "business" | "mosque";
  className?: string;
}

const SearchBar = ({ type = "business", className }: SearchBarProps) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    if (keyword) searchParams.append("keyword", keyword);
    if (category) searchParams.append("category", category);
    
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

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
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
    </form>
  );
};

export default SearchBar;
