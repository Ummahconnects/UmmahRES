
import SearchBar from "@/components/SearchBar";
import LocationIndicator from "@/components/LocationIndicator";

interface BusinessPageHeaderProps {
  showLocationIndicator?: boolean;
}

const BusinessPageHeader = ({ showLocationIndicator = false }: BusinessPageHeaderProps) => {
  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-muslim-dark">Muslim Businesses</h1>
              <p className="text-gray-600">
                Find halal restaurants, shops, professionals, and more
              </p>
              {showLocationIndicator && (
                <div className="mt-2">
                  <LocationIndicator />
                </div>
              )}
            </div>
            <div className="ml-6 max-w-md font-arabic font-bold text-sm text-muslim-dark">
              The fisherman's net and the programmer's code,
              the mother's home bakery and the scientist's microscope—
              each halal grain of rizq, when shared,
              becomes mountains of barakah.
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <SearchBar type="business" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPageHeader;
