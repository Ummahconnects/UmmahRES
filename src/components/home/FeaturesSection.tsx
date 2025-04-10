
import { Globe, Map, Search, TrendingUp } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-muslim-dark">Why Use Ummah Connects?</h2>
          <p className="text-gray-600 mt-2">Creating Barakat with every transaction, for supporting Muslims globally</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muslim-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Businesses</h3>
            <p className="text-gray-600">
              Connect with verified Muslim-owned businesses you can trust for all your needs.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Map className="h-8 w-8 text-muslim-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Location-Based</h3>
            <p className="text-gray-600">
              Find Muslim-owned businesses and mosques near you or in any location globally.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-muslim-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Operating globally to connect the Ummah, starting from the USA and expanding worldwide.
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
  );
};

export default FeaturesSection;
