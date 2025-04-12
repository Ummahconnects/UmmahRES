
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Store, HeartHandshake } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import BetaProgramBanner from "./BetaProgramBanner";
import FlashingBanner from "@/components/FlashingBanner";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("businesses");

  return (
    <section className="pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="md:w-3/4 mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-arabic font-bold text-muslim-teal mb-4 tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-4 italic">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>

            <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-muslim-dark mb-4">
              <span className="tracking-wide">UMMAH-CONNECTS</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              A place where all services connects — for Muslims by Muslims.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Find Muslim-Owned Businesses Worldwide
            </p>
            <p className="text-sm text-muslim-teal">www.ummah-connects.com</p>
          </div>
          
          <BetaProgramBanner />
          
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
          
          <div className="mt-4">
            <FlashingBanner 
              icon={<HeartHandshake className="h-4 w-4" />}
              message="Supporting our Ummah: Free listings for mosques and charities! Community events for just a $5 donation."
              colorScheme="info"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
