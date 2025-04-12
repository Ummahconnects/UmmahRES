
import { BusinessProps } from "@/components/BusinessCard";
import BusinessCard from "@/components/BusinessCard";
import BusinessListItem from "./BusinessListItem";

interface BusinessesListProps {
  businesses: BusinessProps[];
  viewMode: "grid" | "list";
}

const BusinessesList = ({ businesses, viewMode }: BusinessesListProps) => {
  if (businesses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <BusinessCard key={business.id} {...business} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {businesses.map((business) => (
        <BusinessListItem key={business.id} {...business} />
      ))}
    </div>
  );
};

export default BusinessesList;
