
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Filter, List, Grid, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import BusinessCard, { BusinessProps } from "@/components/BusinessCard";
import FilterSidebar from "@/components/FilterSidebar";
import { cn } from "@/lib/utils";

// Extended mock data for businesses
const mockBusinesses: BusinessProps[] = [
  {
    id: "1",
    name: "Halal Delights Restaurant",
    category: "Restaurants",
    address: "123 Main St, Brooklyn, NY",
    rating: 4.8,
    phone: "(555) 123-4567",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isOpen: true,
    featured: true,
    services: ["Halal Food", "Delivery", "Catering"]
  },
  {
    id: "2",
    name: "Al-Baraka Grocery",
    category: "Grocery",
    address: "456 Market Ave, Chicago, IL",
    rating: 4.5,
    phone: "(555) 234-5678",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
    isOpen: true,
    services: ["Halal Meat", "Fresh Produce", "International Foods"]
  },
  {
    id: "3",
    name: "Salaam Healthcare Clinic",
    category: "Healthcare",
    address: "789 Medical Dr, Houston, TX",
    rating: 4.9,
    phone: "(555) 345-6789",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isOpen: false,
    services: ["Family Medicine", "Women's Health", "Pediatrics"]
  },
  {
    id: "4",
    name: "Barakah Financial Services",
    category: "Finance",
    address: "101 Commerce Blvd, Dallas, TX",
    rating: 4.2,
    phone: "(555) 456-7890",
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isOpen: true,
    services: ["Islamic Finance", "Halal Investments", "Financial Planning"]
  },
  {
    id: "5",
    name: "Zam Zam Halal Market",
    category: "Grocery",
    address: "202 Grocery Lane, Seattle, WA",
    rating: 4.3,
    phone: "(555) 567-8901",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    isOpen: true,
    services: ["Halal Meat", "Imported Goods", "Fresh Produce"]
  },
  {
    id: "6",
    name: "Medina Clothing Boutique",
    category: "Retail",
    address: "303 Fashion Ave, Los Angeles, CA",
    rating: 4.7,
    phone: "(555) 678-9012",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isOpen: true,
    services: ["Modest Fashion", "Islamic Attire", "Gifts"]
  },
  {
    id: "7",
    name: "Ibrahim Law Office",
    category: "Professional Services",
    address: "404 Legal Street, Washington, DC",
    rating: 4.6,
    phone: "(555) 789-0123",
    image: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isOpen: false,
    services: ["Immigration Law", "Family Law", "Business Law"]
  },
  {
    id: "8",
    name: "Al-Risala Islamic School",
    category: "Education",
    address: "505 Knowledge Road, Detroit, MI",
    rating: 4.9,
    phone: "(555) 890-1234",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1422&q=80",
    isOpen: true,
    services: ["Islamic Education", "Quran Classes", "Arabic Language"]
  }
];

const BusinessesPage = () => {
  const [searchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState<BusinessProps[]>(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessProps[]>(mockBusinesses);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);

  // Handle initial search params
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const location = searchParams.get("location");
    const category = searchParams.get("category");
    
    let filtered = [...businesses];
    
    if (keyword) {
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(keyword.toLowerCase()) ||
        business.category.toLowerCase().includes(keyword.toLowerCase()) ||
        business.services?.some(service => 
          service.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
    
    if (location) {
      filtered = filtered.filter(business => 
        business.address.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(business => 
        business.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    setFilteredBusinesses(filtered);
  }, [searchParams, businesses]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredBusinesses];
    
    switch (value) {
      case "featured":
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    setFilteredBusinesses(sorted);
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...businesses];
    
    // Filter by category
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(business => 
        filters.categories.some((cat: string) => 
          business.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
    
    // Filter by service
    if (filters.services && filters.services.length > 0) {
      filtered = filtered.filter(business => 
        business.services?.some(service => 
          filters.services.includes(service)
        )
      );
    }
    
    // Filter by rating
    if (filters.ratings && filters.ratings.length > 0) {
      filtered = filtered.filter(business => {
        return filters.ratings.some((rating: string) => {
          const ratingValue = parseInt(rating.split(' ')[0]);
          return business.rating >= ratingValue;
        });
      });
    }
    
    // Filter by open status
    if (filters.isOpen) {
      filtered = filtered.filter(business => business.isOpen);
    }
    
    setFilteredBusinesses(filtered);
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarVisible(!isFilterSidebarVisible);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-muslim-dark">Muslim Businesses</h1>
                <p className="text-gray-600">
                  Find halal restaurants, shops, professionals, and more
                </p>
              </div>
              <div className="ml-6 max-w-md italic text-sm text-gray-600">
                The fisherman's net and the programmer's code,
                the mother's home bakery and the scientist's microscope—
                each halal grain of rizq, when shared,
                becomes mountains of barakah.
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <SearchBar type="business" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-6">
              <FilterSidebar type="business" onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline" 
              onClick={toggleFilterSidebar}
              className="w-full flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            {isFilterSidebarVisible && (
              <div className="mt-4">
                <FilterSidebar type="business" onFilterChange={handleFilterChange} />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-500">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  <span>Showing {filteredBusinesses.length} businesses</span>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "px-2",
                        viewMode === "grid" && "bg-gray-100"
                      )}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-8" />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "px-2",
                        viewMode === "list" && "bg-gray-100"
                      )}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {filteredBusinesses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} {...business} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBusinesses.map((business) => (
                  <div key={business.id} className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessesPage;

