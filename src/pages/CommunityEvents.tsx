
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Filter, Plus } from "lucide-react";
import FeaturedEventsSection from "@/components/events/FeaturedEventsSection";

const CommunityEventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-muslim-dark">Community Events</h1>
            <p className="text-gray-600 mt-2">Discover, book, and participate in events from our global Muslim community</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Near Me</span>
            </Button>
            
            <Button className="bg-muslim-teal hover:bg-muslim-teal/90 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Submit Event</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <FeaturedEventsSection />
          </TabsContent>
          
          <TabsContent value="featured" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Featured Events Coming Soon</h3>
              <p className="text-gray-600">Check back later for curated featured events</p>
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Past Events Archive</h3>
              <p className="text-gray-600">Browse our archive of previous community events</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CommunityEventsPage;
