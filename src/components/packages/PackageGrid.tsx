import React, { useState, useEffect } from "react";
import { Star, Badge, Package, Award, Sparkles, Globe } from "lucide-react";
import PackageCard from "./PackageCard";

const PackageGrid = () => {
  const [sparklePosition, setSparklePosition] = useState({ top: 0, left: 0 });
  
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
    { text: "1 category listing" },
    { text: "Standard search ranking" }
  ];

  const premiumFeatures = [
    { text: "Enhanced business profile" },
    { text: "Featured in search results" },
    { text: "Photo gallery (up to 10 images)" },
    { text: "Customer reviews & ratings" },
    { text: "3 category listings" },
    { text: "Basic analytics dashboard", highlight: true },
    { text: "2 key performance metrics", highlight: true }
  ];

  const platinumFeatures = [
    { text: "Everything in Premium" },
    { text: "Featured listing (6 per city page)" },
    { text: "Promotional offers & coupons" },
    { text: "Unlimited photo gallery" },
    { text: "Full analytics dashboard", highlight: true },
    { text: "Unlimited category listings" },
    { text: "City-specific promotion" },
    { text: "Beta program access", highlight: true }
  ];

  const supremeFeatures = [
    { text: "Everything in Platinum" },
    { text: "Sponsorship opportunity", highlight: true },
    { text: "Half-page featured sponsor spot" },
    { text: "Limited to only 2 sponsors per month per country", highlight: true },
    { text: "Regional homepage placement" },
    { text: "Featured in regional newsletter" },
    { text: "Social media promotion" },
    { text: "Priority visibility in your region" },
    { text: "Early access to new features", highlight: true }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      <PackageCard
        title="Basic Listing"
        description="Perfect for small businesses"
        price="$9.99"
        annualPrice="$99.90"
        annualSavings="Save $19.98"
        features={basicFeatures}
        color="gray-500"
        primaryButtonText="Get Started"
        icon={<Package className="h-5 w-5 text-gray-500" />}
        showLocalCurrency={true}
      />

      <PackageCard
        title="Premium"
        description="Ideal for growing businesses"
        price="$24.99"
        annualPrice="$249.90"
        annualSavings="Save $49.98"
        features={premiumFeatures}
        color="muslim-teal"
        primaryButtonText="Start Premium"
        additionalInfo="Includes 2 analytics metrics"
        icon={<Badge className="h-5 w-5 text-muslim-teal" />}
        showLocalCurrency={true}
      />

      <PackageCard
        title="Platinum"
        description="For established businesses"
        price="$49.99"
        annualPrice="$499.90"
        annualSavings="Save $99.98"
        features={platinumFeatures}
        color="muslim-blue"
        primaryButtonText="Go Platinum"
        additionalInfo="Full analytics dashboard included"
        icon={<Award className="h-5 w-5 text-muslim-blue" />}
        showLocalCurrency={true}
      />

      <PackageCard
        title="Supreme"
        description="Regional sponsorship opportunity"
        price="$299.99"
        annualPrice="$2,999.90"
        annualSavings="Save $599.98"
        features={supremeFeatures}
        color="muslim-gold"
        banner="Regional Sponsor"
        primaryButtonText="Become a Sponsor"
        secondaryButtonText="Reserve Sponsorship Spot"
        additionalInfo="Only 2 sponsorships available per month per country"
        isHighlighted={true}
        sparklePosition={sparklePosition}
        icon={<Sparkles className="h-5 w-5 text-amber-500" />}
        showLocalCurrency={true}
      />
    </div>
  );
};

export default PackageGrid;
