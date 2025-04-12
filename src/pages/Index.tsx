
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedBusinessesSection from "@/components/home/FeaturedBusinessesSection";
import MosquesSection from "@/components/home/MosquesSection";
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FlashingBanner from "@/components/FlashingBanner";
import { HeartHandshake } from "lucide-react";

const HomePage = () => {
  return (
    <Layout>
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-50 z-[-1]" 
        style={{
          backgroundImage: `url("/lovable-uploads/798a3755-657f-45d1-a681-0d4bf3476213.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <FlashingBanner 
          icon={<HeartHandshake className="h-4 w-4" />}
          message="Supporting our Ummah: Free listings for mosques and charities! Community events for just a $5 (or equivalent in local currency) donation."
          colorScheme="info"
        />
      </div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedBusinessesSection />
      <MosquesSection />
      <CTASection />
      <FeaturesSection />
    </Layout>
  );
};

export default HomePage;
