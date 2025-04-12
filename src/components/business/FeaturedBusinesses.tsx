
import { Button } from "@/components/ui/button";
import { BusinessProps } from "@/components/BusinessCard";
import BusinessCard from "@/components/BusinessCard";

interface FeaturedBusinessesProps {
  businesses: BusinessProps[];
}

const FeaturedBusinesses = ({ businesses }: FeaturedBusinessesProps) => {
  if (businesses.length === 0) return null;

  return (
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
        {businesses.map((business) => (
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
  );
};

export default FeaturedBusinesses;
