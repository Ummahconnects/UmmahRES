
import { Link } from "react-router-dom";
import { ArrowRight, Award, Star } from "lucide-react";
import BusinessCard, { BusinessProps } from "@/components/BusinessCard";
import { useEffect, useState } from "react";

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

const FeaturedBusinessesSection = () => {
  const [sparklePosition, setSparklePosition] = useState({ top: 0, left: 0 });
  
  // Animation for the sparkling stars
  useEffect(() => {
    const interval = setInterval(() => {
      setSparklePosition({
        top: Math.floor(Math.random() * 100),
        left: Math.floor(Math.random() * 100)
      });
    }, 700);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gray-50 relative overflow-hidden">
      {/* Animated star that moves around */}
      <div 
        className="absolute h-6 w-6 text-amber-300 animate-pulse z-10"
        style={{ top: `${sparklePosition.top}%`, left: `${sparklePosition.left}%` }}
      >
        <Star className="fill-amber-300" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-muslim-dark">Featured Sponsors</h2>
              <Award className="h-6 w-6 text-muslim-gold" />
            </div>
            <p className="text-gray-600 mt-2">Our major sponsors showcase for this month</p>
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
        
        <div className="mt-10 text-center">
          <div className="inline-block">
            <div className="relative overflow-hidden">
              <Link 
                to="/sales" 
                className="relative z-10 inline-flex items-center bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-muslim-dark px-6 py-3 rounded-md font-bold transition-all hover:shadow-lg"
              >
                Become a Featured Sponsor <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              
              {/* Gold banner styling */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 opacity-20 animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Only 2 spots available each month!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinessesSection;
