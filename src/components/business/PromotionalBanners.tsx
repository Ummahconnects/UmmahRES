
import React from "react";
import { Sparkles } from "lucide-react";
import FlashingBanner from "@/components/FlashingBanner";
import PremiumPackagesPromo from "@/components/business/PremiumPackagesPromo";
import FreeMosqueCharityListingsBanner from "@/components/FreeMosqueCharityListingsBanner";

const PromotionalBanners = () => {
  return (
    <>
      <FlashingBanner 
        icon={<Sparkles className="h-4 w-4" />}
        message="New users: Sign up today and get a FREE 3-day Platinum trial with all premium features!"
        colorScheme="warning"
        className="mb-6"
      />
      
      <PremiumPackagesPromo />
      
      <FreeMosqueCharityListingsBanner />
    </>
  );
};

export default PromotionalBanners;
