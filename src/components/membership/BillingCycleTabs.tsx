
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BillingCycleTabsProps {
  value: 'monthly' | 'annual';
  onChange: (value: 'monthly' | 'annual') => void;
}

const BillingCycleTabs = ({ value, onChange }: BillingCycleTabsProps) => {
  return (
    <div className="mb-6">
      <Tabs 
        defaultValue={value} 
        className="w-full max-w-md mx-auto"
        onValueChange={(v) => onChange(v as 'monthly' | 'annual')}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
          <TabsTrigger value="annual">Annual Billing (Save)</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default BillingCycleTabs;
