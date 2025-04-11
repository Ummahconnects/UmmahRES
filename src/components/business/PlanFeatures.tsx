
import { Check } from "lucide-react";
import { planDetails } from "@/types/membershipTypes";

interface PlanFeaturesProps {
  planType: 'basic' | 'premium' | 'enterprise';
}

const PlanFeatures = ({ planType }: PlanFeaturesProps) => {
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
      <p className="mt-4 font-semibold">{planDetails[planType].price}</p>
    </div>
  );
};

export default PlanFeatures;
