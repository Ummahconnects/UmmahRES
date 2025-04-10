
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Map, Search, TrendingUp, Users, Building, Store } from "lucide-react";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import BusinessCard, { BusinessProps } from "@/components/BusinessCard";
import MosqueCard, { MosqueProps } from "@/components/MosqueCard";

// Mock data for businesses
const mockBusinesses: BusinessProps[] = [
  {
    id: "1",
    name: "Halal Delights Restaurant",
    category: "Restaurant",
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
  }
];

// Mock data for mosques
const mockMosques: MosqueProps[] = [
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
  }
];

// Business categories
const categories = [
  { name: "Restaurants", icon: "🍽️" },
  { name: "Grocery", icon: "🛒" },
  { name: "Healthcare", icon: "🏥" },
  { name: "Education", icon: "📚" },
  { name: "Professional", icon: "💼" },
  { name: "Finance", icon: "💰" }
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("businesses");

  return (
    <Layout>
      {/* Hero Section */}
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

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-muslim-dark">Browse by Category</h2>
            <p className="text-gray-600 mt-2">Explore businesses across different categories</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/businesses?category=${category.name.toLowerCase()}`}
                className="flex flex-col items-center p-6 bg-white rounded-lg border hover:shadow-md transition-shadow text-center"
              >
                <span className="text-3xl mb-3">{category.icon}</span>
                <h3 className="font-medium">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-muslim-dark">Featured Businesses</h2>
              <p className="text-gray-600 mt-2">Discover top-rated Muslim-owned businesses</p>
            </div>
            <Link to="/businesses" className="text-muslim-teal hover:text-muslim-teal/80 flex items-center font-medium">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        </div>
      </section>

      {/* Mosques Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-muslim-dark">Mosques & Islamic Centers</h2>
              <p className="text-gray-600 mt-2">Find places of worship in your area</p>
            </div>
            <Link to="/mosques" className="text-muslim-teal hover:text-muslim-teal/80 flex items-center font-medium">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMosques.map((mosque) => (
              <MosqueCard key={mosque.id} {...mosque} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-muslim-dark mb-4">
                Are you a Muslim Business Owner?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                List your business or mosque in our directory to connect with the Muslim community and increase your visibility.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="bg-muslim-teal hover:bg-muslim-teal/90"
                  size="lg"
                >
                  List Your Business
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-muslim-dark">Why Use Muslim Directory?</h2>
            <p className="text-gray-600 mt-2">The easiest way to find and connect with Muslim businesses and mosques</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muslim-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Discovery</h3>
              <p className="text-gray-600">
                Quickly find halal restaurants, shops, professionals, and more with our powerful search and filter tools.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="h-8 w-8 text-muslim-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location-Based</h3>
              <p className="text-gray-600">
                Find Muslim-owned businesses and mosques near you or in any location worldwide.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-muslim-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Growth</h3>
              <p className="text-gray-600">
                Help Muslim businesses thrive by supporting the community and promoting ethical commerce.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
