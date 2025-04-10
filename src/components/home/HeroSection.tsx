
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Store } from "lucide-react";
import SearchBar from "@/components/SearchBar";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("businesses");

  return (
    <section className="pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="md:w-3/4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-muslim-dark mb-4">
            Find Muslim-Owned Businesses & Mosques
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connect with the Muslim community worldwide. Discover halal restaurants, shops, professionals, and places of worship.
          </p>
          
          <Tabs 
            defaultValue="businesses" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full bg-white p-1 rounded-lg shadow-sm"
          >
            <TabsList className="w-full mb-4 grid grid-cols-2">
              <TabsTrigger value="businesses">
                <Store className="h-4 w-4 mr-2" />
                Businesses
              </TabsTrigger>
              <TabsTrigger value="mosques">
                <Building className="h-4 w-4 mr-2" />
                Mosques
              </TabsTrigger>
            </TabsList>
            <TabsContent value="businesses" className="px-4 pb-4">
              <SearchBar type="business" />
            </TabsContent>
            <TabsContent value="mosques" className="px-4 pb-4">
              <SearchBar type="mosque" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
