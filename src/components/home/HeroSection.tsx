
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
          <div className="mb-6">
            {/* Enhanced Bismillah with larger font and shadow effect */}
            <div className="mb-4 relative">
              <p className="text-muslim-teal text-3xl md:text-4xl mb-1 font-[Scheherazade] tracking-wider">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </p>
              <p className="text-gray-500 text-sm absolute -bottom-5 w-full text-center"
                 style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>
            
            {/* Enhanced Assalamu Alaikum with larger font and shadow effect */}
            <div className="mt-8 relative">
              <p className="text-muslim-blue text-2xl md:text-3xl mb-1 font-[Scheherazade] tracking-wider">
                السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </p>
              <p className="text-gray-500 text-sm absolute -bottom-5 w-full text-center"
                 style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                Peace be upon you, and Allah's mercy and blessings
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <h1 className="text-4xl md:text-5xl font-bold text-muslim-dark mb-4">
              Ummah Connects
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              A place where all services connects — for Muslims by Muslims.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Find Muslim-Owned Businesses Worldwide
            </p>
          </div>
          
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
