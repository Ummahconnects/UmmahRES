
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShieldCheck, UserCheck } from "lucide-react";

interface MembershipHeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const MembershipHeader = ({ activeTab, onTabChange }: MembershipHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-muslim-dark mb-4">Business Membership</h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Join our business membership program to connect with the Ummah and grow your business while supporting the Muslim community.
      </p>
      
      <Tabs defaultValue={activeTab} className="w-full mt-8" onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="plans">
            <Users className="h-4 w-4 mr-2" />
            Membership Plans
          </TabsTrigger>
          <TabsTrigger value="benefits">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Benefits
          </TabsTrigger>
          <TabsTrigger value="apply">
            <UserCheck className="h-4 w-4 mr-2" />
            Apply Now
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MembershipHeader;
