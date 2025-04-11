
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import PackageCard from "./PackageCard";

const PackageGrid = () => {
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

  const basicFeatures = [
    { text: "Basic business listing" },
    { text: "Contact information" },
    { text: "Business hours" },
    { text: "1 category listing" }
  ];

  const premiumFeatures = [
    { text: "Enhanced business profile" },
    { text: "Featured in search results" },
    { text: "Photo gallery (up to 10 images)" },
    { text: "Customer reviews & ratings" },
    { text: "3 category listings" },
    { text: "Basic analytics" }
  ];

  const platinumFeatures = [
    { text: "Everything in Premium" },
    { text: "Featured listing (6 per city page)" },
    { text: "Promotional offers & coupons" },
    { text: "Unlimited photo gallery" },
    { text: "Advanced analytics dashboard" },
    { text: "Unlimited category listings" },
    { text: "City-specific promotion" }
  ];

  const supremeFeatures = [
    { text: "Everything in Platinum" },
    { text: "Half-page featured sponsor spot" },
    { text: "Limited to only 2 businesses per month", highlight: true },
    { text: "Premium homepage placement" },
    { text: "Featured in newsletter" },
    { text: "Social media promotion" },
    { text: "Global visibility across all regions" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      <PackageCard
        title="Basic Listing"
        description="Perfect for small businesses"
        price="$9.99"
        features={basicFeatures}
        color="gray-500"
        primaryButtonText="Get Started"
      />

      <PackageCard
        title="Premium"
        description="Ideal for growing businesses"
        price="$24.99"
        features={premiumFeatures}
        color="muslim-teal"
        primaryButtonText="Start Premium"
      />

      <PackageCard
        title="Platinum"
        description="For established businesses"
        price="$49.99"
        features={platinumFeatures}
        color="muslim-blue"
        primaryButtonText="Go Platinum"
      />

      <PackageCard
        title="Supreme"
        description="Exclusive sponsorship opportunity"
        price="$299.99"
        features={supremeFeatures}
        color="muslim-gold"
        banner="Major Sponsor"
        primaryButtonText="Become a Major Sponsor"
        secondaryButtonText="Reserve Spot for Next Month"
        isHighlighted={true}
        sparklePosition={sparklePosition}
      />
    </div>
  );
};

export default PackageGrid;
