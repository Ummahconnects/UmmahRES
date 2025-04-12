
import React from 'react';
import { Heart, Church, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FreeMosqueCharityListingsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-muslim-teal/10 to-muslim-blue/10 p-6 rounded-lg mt-6 border border-muslim-teal/20 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-muslim-dark mb-3 flex items-center">
            <Church className="h-6 w-6 mr-2 text-muslim-teal" />
            Free Listings for Mosques & Charities
          </h3>
          <p className="text-gray-700 mb-4">
            Support our community by listing your mosque or charity organization for FREE
          </p>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              className="border-muslim-teal text-muslim-teal hover:bg-muslim-teal/10"
            >
              <Heart className="h-4 w-4 mr-2" />
              List Your Charity
            </Button>
            <Button 
              variant="outline" 
              className="border-muslim-teal text-muslim-teal hover:bg-muslim-teal/10"
            >
              <Church className="h-4 w-4 mr-2" />
              Register Mosque
            </Button>
          </div>
        </div>
        <Gift className="h-20 w-20 text-muslim-teal/20" />
      </div>
    </div>
  );
};

export default FreeMosqueCharityListingsBanner;
