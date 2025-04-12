
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
import { Filter, List, Grid, MapPin, Star, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import BusinessCard, { BusinessProps } from "@/components/BusinessCard";
import FilterSidebar from "@/components/FilterSidebar";
import { cn } from "@/lib/utils";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
    services: ["Islamic Education", "Quran Classes", "Arabic Language"]
  },
  {
    id: "9",
    name: "Amina's Modest Fashion",
    category: "Retail",
    address: "606 Style Street, Miami, FL",
    rating: 4.7,
    phone: "(555) 901-2345",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    isOpen: true,
    featured: true,
    services: ["Modest Fashion", "Hijabs", "Accessories"]
  },
  {
    id: "10",
    name: "Halal Butcher Shop",
    category: "Grocery",
    address: "707 Meat Avenue, Phoenix, AZ",
    rating: 4.4,
    phone: "(555) 012-3456",
    image: "https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    isOpen: true,
    services: ["Halal Meat", "Custom Cuts", "Local Produce"]
  }
];

const BusinessesPage = () => {
  const [searchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState<BusinessProps[]>(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessProps[]>(mockBusinesses);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<BusinessProps[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // Extract featured businesses
    const featured = businesses.filter(business => business.featured);
    setFeaturedBusinesses(featured.slice(0, 9)); // Get first 9 featured businesses
    
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
    
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(business => 
        filters.categories.some((cat: string) => 
          business.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
    
    if (filters.services && filters.services.length > 0) {
      filtered = filtered.filter(business => 
        business.services?.some(service => 
          filters.services.includes(service)
        )
      );
    }
    
    if (filters.ratings && filters.ratings.length > 0) {
      filtered = filtered.filter(business => {
        return filters.ratings.some((rating: string) => {
          const ratingValue = parseInt(rating.split(' ')[0]);
          return business.rating >= ratingValue;
        });
      });
    }
    
    if (filters.isOpen) {
      filtered = filtered.filter(business => business.isOpen);
    }
    
    setFilteredBusinesses(filtered);
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarVisible(!isFilterSidebarVisible);
  };

  const paginatedBusinesses = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBusinesses.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

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
              <div className="ml-6 max-w-md font-arabic font-bold text-sm text-muslim-dark">
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

      {featuredBusinesses.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-muslim-dark">Featured Businesses</h2>
              <p className="text-gray-600">Our top sponsors and partners</p>
            </div>
            <div className="text-sm text-muslim-teal">
              <a href="/packages" className="flex items-center hover:underline">
                Become featured <span className="ml-1">→</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="border-muslim-teal text-muslim-teal hover:bg-muslim-teal/10"
              onClick={() => window.location.href = '/packages'}
            >
              View Premium Business Packages
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Social Media Follow Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6 w-full">
            <h3 className="text-lg font-semibold text-muslim-dark mb-4">Follow Us on Social Media</h3>
            <p className="text-gray-600 mb-4">Stay connected with the latest business updates and community news</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-md hover:bg-[#1877F2]/90 transition-colors">
                <Facebook size={20} />
                <span>Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1DA1F2] text-white px-4 py-2 rounded-md hover:bg-[#1DA1F2]/90 transition-colors">
                <Twitter size={20} />
                <span>Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0A66C2] text-white px-4 py-2 rounded-md hover:bg-[#0A66C2]/90 transition-colors">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#FF0000] text-white px-4 py-2 rounded-md hover:bg-[#FF0000]/90 transition-colors">
                <Youtube size={20} />
                <span>YouTube</span>
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-6">
              <FilterSidebar type="business" onFilterChange={handleFilterChange} />
            </div>
          </div>

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedBusinesses().map((business) => (
                  <BusinessCard key={business.id} {...business} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedBusinesses().map((business) => (
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
            
            {/* Pagination */}
            {filteredBusinesses.length > itemsPerPage && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      let pageNum = i + 1;
                      
                      // Logic for showing pagination around current page
                      if (totalPages > 5) {
                        if (currentPage > 3) {
                          pageNum = currentPage - 3 + i;
                        }
                        
                        if (currentPage > totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        }
                      }
                      
                      return pageNum <= totalPages ? (
                        <PaginationItem key={pageNum}>
                          <PaginationLink 
                            isActive={currentPage === pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      ) : null;
                    })}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            
            <div className="mt-10 bg-gradient-to-r from-muslim-teal/10 to-muslim-blue/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-muslim-dark mb-3">Premium Business Packages</h3>
              <p className="text-gray-700 mb-4">
                Upgrade your business listing with our premium packages and reach more customers!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-semibold mb-2">Basic</h4>
                  <p className="text-sm text-gray-600">Enhanced visibility and basic analytics</p>
                  <p className="mt-2 font-medium">$9.99/month</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border-2 border-muslim-gold">
                  <h4 className="font-semibold mb-2">Premium</h4>
                  <p className="text-sm text-gray-600">Featured listings, advanced analytics</p>
                  <p className="mt-2 font-medium">$19.99/month</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h4 className="font-semibold mb-2">Enterprise</h4>
                  <p className="text-sm text-gray-600">Global sponsorship, full analytics suite</p>
                  <p className="mt-2 font-medium">$49.99/month</p>
                </div>
              </div>
              <Button
                className="bg-muslim-teal hover:bg-muslim-teal/90"
                onClick={() => window.location.href = '/packages'}
              >
                View All Packages
              </Button>
            </div>

            {/* Social Media Follow Section (Mobile) */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm lg:hidden">
              <h3 className="text-lg font-semibold text-muslim-dark mb-4">Connect With Us</h3>
              <div className="flex justify-center space-x-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:text-[#1877F2]/80">
                  <Facebook size={28} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:text-[#1DA1F2]/80">
                  <Twitter size={28} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:text-[#E4405F]/80">
                  <Instagram size={28} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-[#0A66C2]/80">
                  <Linkedin size={28} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:text-[#FF0000]/80">
                  <Youtube size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessesPage;
