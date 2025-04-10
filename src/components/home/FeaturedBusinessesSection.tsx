
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BusinessCard, { BusinessProps } from "@/components/BusinessCard";

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
  return (
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
  );
};

export default FeaturedBusinessesSection;
