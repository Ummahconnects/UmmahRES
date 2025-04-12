import React, { useState } from 'react';
import Layout from "@/components/Layout";
import EventsBanner from "@/components/EventsBanner";
import { Calendar, MapPin, Users, Clock, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const mockEvents = [
  {
    id: 1,
    title: "Community Food Festival",
    description: "Join us for a day of delicious food, cultural exchange, and community bonding.",
    date: "2025-05-15",
    time: "11:00 AM - 6:00 PM",
    location: "Central Park, Sydney",
    state: "NSW",
    city: "Sydney",
    organizer: "Sydney Cultural Association",
    category: "Cultural",
    isFree: false,
    donationAmount: "$5 suggested donation",
    image: "/lovable-uploads/798a3755-657f-45d1-a681-0d4bf3476213.png"
  },
  {
    id: 2,
    title: "Weekend Charity Run",
    description: "Participate in our 5K charity run to raise funds for local education initiatives.",
    date: "2025-05-20",
    time: "8:00 AM - 11:00 AM",
    location: "Riverside Park, Melbourne",
    state: "VIC",
    city: "Melbourne",
    organizer: "Melbourne Runners Club",
    category: "Sports",
    isFree: false,
    donationAmount: "$10 registration fee",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Children's Book Reading",
    description: "Special book reading session for children ages 4-10 with interactive activities.",
    date: "2025-05-25",
    time: "2:00 PM - 4:00 PM",
    location: "Community Library, Brisbane",
    state: "QLD",
    city: "Brisbane",
    organizer: "Brisbane Reading Club",
    category: "Education",
    isFree: true,
    donationAmount: "",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Business Networking Breakfast",
    description: "Connect with local entrepreneurs and business owners while enjoying breakfast.",
    date: "2025-06-01",
    time: "7:30 AM - 9:30 AM",
    location: "Grand Hotel, Perth",
    state: "WA",
    city: "Perth",
    organizer: "Perth Business Association",
    category: "Business",
    isFree: false,
    donationAmount: "$15 includes breakfast",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Family Fun Fair",
    description: "A day filled with games, rides, and entertainment for the whole family.",
    date: "2025-06-05",
    time: "10:00 AM - 5:00 PM",
    location: "Showgrounds, Adelaide",
    state: "SA",
    city: "Adelaide",
    organizer: "Adelaide Family Association",
    category: "Family",
    isFree: false,
    donationAmount: "$8 per person, children under 5 free",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Art Exhibition Opening",
    description: "Featuring works from local artists exploring themes of community and identity.",
    date: "2025-06-10",
    time: "6:00 PM - 9:00 PM",
    location: "City Gallery, Hobart",
    state: "TAS",
    city: "Hobart",
    organizer: "Tasmanian Arts Collective",
    category: "Arts",
    isFree: false,
    donationAmount: "$5 entry donation",
    image: "/placeholder.svg"
  }
];

const states = [
  { value: "all", label: "All States" },
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "WA", label: "Western Australia" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NT", label: "Northern Territory" }
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Cultural", label: "Cultural" },
  { value: "Sports", label: "Sports" },
  { value: "Education", label: "Education" },
  { value: "Business", label: "Business" },
  { value: "Family", label: "Family" },
  { value: "Arts", label: "Arts" },
  { value: "Charity", label: "Charity" },
  { value: "Religious", label: "Religious" }
];

const eventFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  location: z.string().min(5, { message: "Location must be at least 5 characters" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  organizer: z.string().min(3, { message: "Organizer name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  donationAmount: z.string().optional(),
  isFree: z.boolean().default(false),
  contactEmail: z.string().email({ message: "Invalid email address" }),
  contactPhone: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
});

const CommunityEventsPage = () => {
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      state: "",
      city: "",
      organizer: "",
      category: "",
      donationAmount: "",
      isFree: false,
      contactEmail: "",
      contactPhone: "",
      agreeToTerms: false
    },
  });

  const filteredEvents = mockEvents.filter(event => {
    const matchesState = selectedState === "all" || event.state === selectedState;
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesState && matchesCategory && matchesSearch;
  });

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values);
    
    toast({
      title: "Event Submitted!",
      description: "Your event has been submitted for review. We'll notify you once it's approved.",
    });
    
    setIsDialogOpen(false);
    form.reset();
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <EventsBanner />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-muslim-blue mb-4">
            Local Community Events
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover and promote events in your local community. A small donation of $5
            is requested for event listings to support our community engagement initiatives.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Events
              </label>
              <Input
                id="search"
                placeholder="Search by name, description, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by State
              </label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Showing {filteredEvents.length} events
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-muslim-teal hover:bg-muslim-teal/90">
                  <Plus className="mr-2 h-4 w-4" /> Submit Your Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Submit a Community Event</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to submit your community event for review. 
                    A small donation is requested for event listings.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter event title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide a detailed description of your event" 
                              className="resize-none min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Time</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 2:00 PM - 5:00 PM" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Venue/Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter the event venue/address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {states.filter(s => s.value !== "all").map((state) => (
                                  <SelectItem key={state.value} value={state.value}>
                                    {state.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="organizer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organizer/Organization</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter organizer name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.filter(c => c.value !== "all").map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>This is a free event</FormLabel>
                              <FormDescription>
                                Check if attendance is free of charge
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="donationAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Donation/Entry Fee (if applicable)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., $5 suggested donation" 
                                {...field} 
                                disabled={form.watch("isFree")}
                              />
                            </FormControl>
                            <FormDescription>
                              Leave blank if the event is free
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter contact email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter contact phone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Terms and Conditions</FormLabel>
                            <FormDescription>
                              I agree to the listing terms and understand that a donation of $5-$10 
                              is requested to list my event to support community initiatives
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="submit" className="bg-muslim-teal hover:bg-muslim-teal/90">
                        Submit Event
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div 
                  className="h-40 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <Badge variant="outline" className="bg-muslim-teal/10 text-muslim-teal border-muslim-teal">
                      {event.category}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" /> {event.city}, {event.state}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" /> {event.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" /> {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1" /> {event.organizer}
                    </div>
                    <div className="flex items-center text-gray-600">
                      {event.isFree ? (
                        <span className="text-muslim-teal">Free Event</span>
                      ) : (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" /> {event.donationAmount}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any events matching your search criteria.
              </p>
              <Button onClick={() => {
                setSelectedState("all");
                setSelectedCategory("all");
                setSearchQuery("");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {filteredEvents.length > 0 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        <div className="bg-muslim-teal/10 border border-muslim-teal/20 rounded-lg p-6 mt-12">
          <h3 className="text-xl font-bold text-muslim-teal mb-4">About Community Event Listings</h3>
          <p className="text-gray-700 mb-4">
            Our community events page is a dedicated space for local organizations, businesses, and individuals 
            to share upcoming events with the community. We ask for a small donation of $5 for each listing 
            to maintain this service and support our community engagement initiatives.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center text-muslim-teal text-2xl mb-2">📅</div>
              <h4 className="font-medium text-center">Promote Your Event</h4>
              <p className="text-sm text-gray-600 text-center">Reach thousands of local community members</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center text-muslim-teal text-2xl mb-2">🔍</div>
              <h4 className="font-medium text-center">Discover Local Events</h4>
              <p className="text-sm text-gray-600 text-center">Find activities in your area</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center text-muslim-teal text-2xl mb-2">🤝</div>
              <h4 className="font-medium text-center">Build Community</h4>
              <p className="text-sm text-gray-600 text-center">Connect with people who share your interests</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-center text-muslim-teal text-2xl mb-2">💰</div>
              <h4 className="font-medium text-center">Support Initiatives</h4>
              <p className="text-sm text-gray-600 text-center">Your donations help fund community projects</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityEventsPage;
