
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedBusinessesSection from "@/components/home/FeaturedBusinessesSection";
import MosquesSection from "@/components/home/MosquesSection";
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import MajorSponsorCampaign from "@/components/home/MajorSponsorCampaign";

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
      <HeroSection />
      <CategoriesSection />
      <MajorSponsorCampaign />
      <FeaturedBusinessesSection />
      <MosquesSection />
      <CTASection />
      <FeaturesSection />
    </Layout>
  );
};

export default HomePage;
