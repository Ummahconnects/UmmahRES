
import React from "react";
import SearchBar from "@/components/SearchBar";
import LocationIndicator from "@/components/LocationIndicator";

const MosquesHeader = () => {
  return (
    <div className="relative bg-muslim-light">
      <div className="bg-transparent py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-muslim-dark">Masjids & Islamic Centers</h1>
              <p className="text-gray-500">
                Find masjids, prayer spaces, and Islamic centers in Perth, Australia and other locations
              </p>
              <div className="mt-2">
                <LocationIndicator />
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <SearchBar type="mosque" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MosquesHeader;
