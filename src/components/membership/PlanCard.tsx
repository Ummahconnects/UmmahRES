
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PlanDetail } from "@/types/membershipTypes";
import { extractNumericPrice, useLocalCurrency } from "@/utils/currencyUtils";

interface PlanCardProps {
  planType: 'basic' | 'premium' | 'enterprise';
  plan: PlanDetail;
  billingCycle: 'monthly' | 'annual';
  onSelect: () => void;
}

const PlanCard = ({ planType, plan, billingCycle, onSelect }: PlanCardProps) => {
  const { convertAndFormat, localCurrencyInfo } = useLocalCurrency();
  
  return (
    <Card className={`border-t-4 border-t-${plan.color} ${planType === 'premium' ? 'md:scale-105 shadow-lg' : ''}`}>
      <CardHeader>
        <CardTitle>{plan.name} Membership</CardTitle>
        <CardDescription>
          {planType === 'basic' && "For new businesses"}
          {planType === 'premium' && "For growing businesses"}
          {planType === 'enterprise' && "For established businesses"}
        </CardDescription>
        <div className="text-3xl font-bold mt-2">
          {billingCycle === "monthly" ? (
            <>{plan.price}</>
          ) : (
            <>{plan.annualPrice}</>
          )}
        </div>
        
        {billingCycle === "annual" && (
          <div className="text-sm text-green-600 font-medium mt-1">
            {plan.annualSavings}
          </div>
        )}
        
        {localCurrencyInfo.code !== 'USD' && (
          <div className="text-sm text-gray-500 italic mt-1">
            {billingCycle === "monthly" ? (
              <>{convertAndFormat(extractNumericPrice(plan.price))}/month</>
            ) : (
              <>{convertAndFormat(extractNumericPrice(plan.annualPrice))}/year</>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full bg-${plan.color} hover:bg-${plan.color === 'muslim-gold' ? 'amber-500' : plan.color + '/90'}`}
          onClick={onSelect}
        >
          Select {plan.name}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
