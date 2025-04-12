
import { useState } from "react";
import { Check } from "lucide-react";
import { planDetails } from "@/types/membershipTypes";
import { extractNumericPrice, useLocalCurrency } from "@/utils/currencyUtils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PlanFeaturesProps {
  planType: 'basic' | 'premium' | 'enterprise';
}

const PlanFeatures = ({ planType }: PlanFeaturesProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { convertAndFormat, localCurrencyInfo } = useLocalCurrency();
  
  const monthlyPriceInUSD = extractNumericPrice(planDetails[planType].price);
  const annualPriceInUSD = extractNumericPrice(planDetails[planType].annualPrice);
  
  return (
    <div className="border rounded-lg p-4">
      <h4 className="font-semibold mb-2">{planDetails[planType].name} Plan Features:</h4>
      <ul className="space-y-1">
        {planDetails[planType].features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-4">
        <Tabs defaultValue="monthly" onValueChange={(value) => setBillingCycle(value as 'monthly' | 'annual')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mt-3">
          {billingCycle === 'monthly' ? (
            <>
              <p className="font-semibold">{planDetails[planType].price}</p>
              {localCurrencyInfo.code !== 'USD' && (
                <p className="text-sm text-gray-500 italic">
                  {convertAndFormat(monthlyPriceInUSD)}/month
                </p>
              )}
            </>
          ) : (
            <>
              <p className="font-semibold">{planDetails[planType].annualPrice}</p>
              {localCurrencyInfo.code !== 'USD' && (
                <p className="text-sm text-gray-500 italic">
                  {convertAndFormat(annualPriceInUSD)}/year
                </p>
              )}
              <p className="text-sm text-green-600 font-medium mt-1">
                {planDetails[planType].annualSavings}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanFeatures;
