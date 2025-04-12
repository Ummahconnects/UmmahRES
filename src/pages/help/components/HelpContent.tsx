
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveChatSupport from "./LiveChatSupport";
import KnowledgeBase from "./KnowledgeBase";

interface HelpContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const HelpContent = ({ activeTab, setActiveTab }: HelpContentProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full mb-4 grid grid-cols-2">
        <TabsTrigger value="live-chat">Live Chat Support</TabsTrigger>
        <TabsTrigger value="faq">FAQs & Knowledge Base</TabsTrigger>
      </TabsList>
      
      <TabsContent value="live-chat">
        <LiveChatSupport />
      </TabsContent>
      
      <TabsContent value="faq" className="border rounded-lg p-6 h-[500px] overflow-y-auto">
        <KnowledgeBase />
      </TabsContent>
    </Tabs>
  );
};

export default HelpContent;
