
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedBusinessesSection from "@/components/home/FeaturedBusinessesSection";
import MosquesSection from "@/components/home/MosquesSection";
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";

const HomePage = () => {
  return (
    <Layout>
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
