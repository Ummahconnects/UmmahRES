
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedBusinessesSection from "@/components/home/FeaturedBusinessesSection";
import MosquesSection from "@/components/home/MosquesSection";
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import MajorSponsorCampaign from "@/components/home/MajorSponsorCampaign";
import FeaturedEventsSection from "@/components/events/FeaturedEventsSection";

const HomePage = () => {
  return (
    <Layout>
      {/* Remove the fixed background pattern since we now have mosque images in components */}
      <HeroSection />
      <CategoriesSection />
      <MajorSponsorCampaign />
      <FeaturedBusinessesSection />
      <MosquesSection />
      <FeaturedEventsSection />
      <CTASection />
      <FeaturesSection />
    </Layout>
  );
};

export default HomePage;
