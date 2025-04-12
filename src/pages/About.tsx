
import Layout from "@/components/Layout";
import HeroSection from "@/components/about/HeroSection";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import WhyWeExistSection from "@/components/about/WhyWeExistSection";
import OurPromiseSection from "@/components/about/OurPromiseSection";
import OurStorySection from "@/components/about/OurStorySection";
import SocialMediaSection from "@/components/about/SocialMediaSection";
import ContactCTASection from "@/components/about/ContactCTASection";

const AboutPage = () => {
  return (
    <Layout>
      <HeroSection 
        title="Connecting the Ummah, One Need at a Time"
        description="The bridge between struggle and solution—linking Muslims with halal, ethical, and believer-owned services."
      />
      <WhoWeAreSection />
      <WhyWeExistSection />
      <OurPromiseSection />
      <OurStorySection />
      <SocialMediaSection />
      <ContactCTASection />
    </Layout>
  );
};

export default AboutPage;
