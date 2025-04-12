
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactInfoCard from "@/components/help/ContactInfoCard";
import ChatInterface from "@/components/help/ChatInterface";
import FAQSection from "@/components/help/FAQSection";

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("live-chat");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-muslim-dark mb-4">Help & Support</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team is here to assist you with any questions or issues you may have with Ummah-Connects.
            Use our live chat for immediate assistance or browse through our knowledge base.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ContactInfoCard />
          </div>

          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-4 grid grid-cols-2">
                <TabsTrigger value="live-chat">Live Chat Support</TabsTrigger>
                <TabsTrigger value="faq">FAQs & Knowledge Base</TabsTrigger>
              </TabsList>
              
              <TabsContent value="live-chat">
                <ChatInterface />
              </TabsContent>
              
              <TabsContent value="faq" className="border rounded-lg p-6 h-[500px] overflow-y-auto">
                <FAQSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;
