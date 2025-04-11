import { useState, useEffect } from "react";
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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Filter, List, Grid, MapPin, Calendar, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import MosqueCard, { MosqueProps } from "@/components/MosqueCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { perthMosques } from "@/data/perthMosques";

// Export mockMosques so it can be imported in other files
export const mockMosques: MosqueProps[] = [
  {
    id: "1",
    name: "Masjid Al-Noor",
    type: "Islamic Center",
    address: "123 Faith Ave, Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1585129918712-9ed816168e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:30 PM",
    isOpen: true,
    featured: true,
    facilities: ["Women's Section", "Weekend School", "Parking"]
  },
  {
    id: "2",
    name: "Masjid Al-Huda",
    type: "Sunni Mosque",
    address: "456 Peace St, Chicago, IL",
    image: "https://images.unsplash.com/photo-1619982690218-7ad5365b2767?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:00 PM",
    isOpen: true,
    facilities: ["Islamic Library", "Funeral Services"]
  },
  {
    id: "3",
    name: "Islamic Foundation Center",
    type: "Islamic Center",
    address: "789 Unity Dr, Houston, TX",
    image: "https://images.unsplash.com/photo-1510060615691-148d98db8d46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "2:00 PM",
    isOpen: true,
    facilities: ["Weekend School", "Wudu Facilities", "Wheelchair Access"]
  },
  {
    id: "4",
    name: "Masjid Al-Iman",
    type: "Sunni Mosque",
    address: "101 Belief Rd, Atlanta, GA",
    image: "https://images.unsplash.com/photo-1626077422129-7795bdf32dd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:15 PM",
    isOpen: true,
    facilities: ["Women's Section", "Wudu Facilities", "Wheelchair Access"]
  },
  {
    id: "5",
    name: "Downtown Islamic Center",
    type: "Islamic Center",
    address: "202 Central Ave, Austin, TX",
    image: "https://images.unsplash.com/photo-1619982721194-fbdf91caa2a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:45 PM",
    isOpen: false,
    facilities: ["Weekend School", "Parking", "Islamic Library"]
  },
  {
    id: "6",
    name: "Masjid Al-Taqwa",
    type: "Shia Mosque",
    address: "303 Devotion Ln, San Francisco, CA",
    image: "https://images.unsplash.com/photo-1542310503-ff8da10e85a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:00 PM",
    isOpen: true,
    facilities: ["Women's Section", "Funeral Services", "Parking"]
  },
  ...perthMosques
];

// Type for the mosque submission form
type MosqueSubmissionForm = {
  name: string;
  type: string;
  address: string;
  jumuahTime: string;
  facilities: string;
  additionalInfo: string;
  contactEmail: string;
};

const MosquesPage = () => {
  const [searchParams] = useSearchParams();
  const [mosques, setMosques] = useState<MosqueProps[]>(mockMosques);
  const [filteredMosques, setFilteredMosques] = useState<MosqueProps[]>(mockMosques);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
  const [isAddMosqueDialogOpen, setIsAddMosqueDialogOpen] = useState(false);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<MosqueSubmissionForm>({
    defaultValues: {
      name: "",
      type: "Islamic Center",
      address: "",
      jumuahTime: "",
      facilities: "",
      additionalInfo: "",
      contactEmail: "",
    },
  });

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const location = searchParams.get("location");
    const category = searchParams.get("category");
    
    let filtered = [...mosques];
    
    if (keyword) {
      filtered = filtered.filter(mosque => 
        mosque.name.toLowerCase().includes(keyword.toLowerCase()) ||
        mosque.type.toLowerCase().includes(keyword.toLowerCase()) ||
        mosque.facilities?.some(facility => 
          facility.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
    
    if (location) {
      filtered = filtered.filter(mosque => 
        mosque.address.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(mosque => 
        mosque.type.toLowerCase() === category.toLowerCase()
      );
    }
    
    setFilteredMosques(filtered);
  }, [searchParams, mosques]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredMosques];
    
    switch (value) {
      case "featured":
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
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
    
    setFilteredMosques(sorted);
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...mosques];
    
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(mosque => 
        filters.categories.some((cat: string) => 
          mosque.type.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }
    
    if (filters.services && filters.services.length > 0) {
      filtered = filtered.filter(mosque => 
        mosque.facilities?.some(facility => 
          filters.services.includes(facility)
        )
      );
    }
    
    if (filters.isOpen) {
      filtered = filtered.filter(mosque => mosque.isOpen);
    }
    
    setFilteredMosques(filtered);
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarVisible(!isFilterSidebarVisible);
  };

  const handleSubmitMosque = (data: MosqueSubmissionForm) => {
    const facilitiesArray = data.facilities
      .split(',')
      .map(facility => facility.trim())
      .filter(facility => facility !== '');

    toast({
      title: "Mosque submitted for approval",
      description: "Thank you for your contribution. Your submission will be reviewed by our team.",
    });

    console.log("Mosque submission:", {
      ...data,
      facilities: facilitiesArray,
    });

    setIsAddMosqueDialogOpen(false);
    form.reset();
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-muslim-dark">Mosques & Islamic Centers</h1>
              <p className="text-gray-600">
                Find mosques, prayer spaces, and Islamic centers in Perth, Australia and other locations
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <SearchBar type="mosque" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-6">
              <FilterSidebar type="mosque" onFilterChange={handleFilterChange} />
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
                <FilterSidebar type="mosque" onFilterChange={handleFilterChange} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-500">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  <span>Showing {filteredMosques.length} mosques</span>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Button 
                    onClick={() => setIsAddMosqueDialogOpen(true)}
                    className="bg-muslim-teal text-white hover:bg-muslim-teal/90 flex items-center mr-auto sm:mr-0"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Mosque
                  </Button>
                  
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
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
            
            {filteredMosques.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No mosques found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMosques.map((mosque) => (
                  <MosqueCard key={mosque.id} {...mosque} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMosques.map((mosque) => (
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
            )}
          </div>
        </div>
      </div>

      <Dialog open={isAddMosqueDialogOpen} onOpenChange={setIsAddMosqueDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a Mosque or Islamic Center</DialogTitle>
            <DialogDescription>
              Submit mosque details for review. Once approved, it will appear in the directory.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitMosque)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mosque Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mosque name" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type*</FormLabel>
                    <Select 
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Islamic Center">Islamic Center</SelectItem>
                        <SelectItem value="Sunni Mosque">Sunni Mosque</SelectItem>
                        <SelectItem value="Shia Mosque">Shia Mosque</SelectItem>
                        <SelectItem value="Sufi Center">Sufi Center</SelectItem>
                        <SelectItem value="Prayer Space">Prayer Space</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="Full address" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="jumuahTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumu'ah Prayer Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1:30 PM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="facilities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facilities</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Women's Section, Parking, Wheelchair Access" 
                        {...field} 
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      Separate facilities with commas
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any additional details about the mosque"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email*</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Your email for verification"
                        required
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      We'll use this to contact you about your submission
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddMosqueDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit for Approval</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MosquesPage;
