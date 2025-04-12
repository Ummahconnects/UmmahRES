
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BetaOfferBanner from "@/components/membership/BetaOfferBanner";
import MembershipBenefits from "@/components/membership/MembershipBenefits";
import MembershipForm from "@/components/membership/MembershipForm";
import TestimonialsSection from "@/components/membership/TestimonialsSection";
import MembershipHeader from "@/components/membership/MembershipHeader";
import MembershipPlans from "@/components/membership/MembershipPlans";
import MembershipFAQ from "@/components/membership/MembershipFAQ";

const MembershipPage = () => {
  const [activeTab, setActiveTab] = useState("plans");
  const [userCity, setUserCity] = useState<string>("your city");
  
  // Simulate getting user's city - in a real app this would come from geolocation or user profile
  useState(() => {
    // Simulated cities for demo
    const cities = ["London", "New York", "Dubai", "Sydney", "Toronto", "Kuala Lumpur"];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setUserCity(randomCity);
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MembershipHeader 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <BetaOfferBanner city={userCity} />

        <Tabs value={activeTab} className="w-full mb-16">
          <TabsContent value="plans">
            <MembershipPlans />
            <MembershipFAQ />
          </TabsContent>

          <TabsContent value="benefits">
            <MembershipBenefits />
          </TabsContent>

          <TabsContent value="apply">
            <MembershipForm />
          </TabsContent>
        </Tabs>

        <TestimonialsSection />
      </div>
    </Layout>
  );
};

export default MembershipPage;
