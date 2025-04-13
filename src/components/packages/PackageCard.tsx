
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { extractNumericPrice, useLocalCurrency } from "@/utils/currencyUtils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface PackageFeature {
  text: string;
  highlight?: boolean;
}

export interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  annualPrice?: string;
  annualSavings?: string;
  features: PackageFeature[];
  color: string;
  banner?: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  additionalInfo?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  isHighlighted?: boolean;
  sparklePosition?: { top: number; left: number };
  icon?: React.ReactNode;
  showLocalCurrency?: boolean;
  isFree?: boolean;
}

const PackageCard = ({
  title,
  description,
  price,
  annualPrice,
  annualSavings,
  features,
  color,
  banner,
  primaryButtonText,
  secondaryButtonText,
  additionalInfo,
  onPrimaryClick,
  onSecondaryClick,
  isHighlighted = false,
  sparklePosition,
  icon,
  showLocalCurrency = true,
  isFree = false,
}: PackageCardProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { convertAndFormat, localCurrencyInfo } = useLocalCurrency();
  const monthlyPriceValue = extractNumericPrice(price);
  const annualPriceValue = annualPrice ? extractNumericPrice(annualPrice) : monthlyPriceValue * 10;
  
  return (
    <Card className={`border-t-4 border-t-${color} relative ${isHighlighted ? 'md:scale-105 shadow-xl overflow-hidden' : ''}`}>
      {banner && (
        <div className="absolute -top-4 right-0 left-0 mx-auto w-max px-4 py-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-muslim-dark text-sm font-bold rounded-full border border-amber-300 shadow-md animate-pulse">
          {banner}
        </div>
      )}
      
      {isFree && (
        <div className="absolute -top-4 right-0 left-0 mx-auto w-max px-4 py-1 bg-green-500 text-white text-sm font-bold rounded-full border border-green-400 shadow-md">
          FREE
        </div>
      )}
      
      {isHighlighted && (
        <>
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-400 transform -rotate-45 -translate-x-10 -translate-y-10"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400 via-yellow-300 to-amber-400 transform rotate-45 translate-x-10 -translate-y-10"></div>
          
          {sparklePosition && (
            <div 
              className="absolute h-6 w-6 text-amber-300 animate-pulse z-10"
              style={{ top: `${sparklePosition.top}%`, left: `${sparklePosition.left}%` }}
            >
              <Star className="fill-amber-300" />
            </div>
          )}
        </>
      )}
      
      <CardHeader className={`relative z-10 ${isHighlighted ? 'bg-gradient-to-b from-amber-50 to-transparent' : ''}`}>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {icon && <div>{icon}</div>}
        </div>
        <CardDescription>{description}</CardDescription>
        
        {!isFree && annualPrice && (
          <div className="mt-2">
            <Tabs 
              defaultValue="monthly" 
              className="w-full"
              onValueChange={(value) => setBillingCycle(value as 'monthly' | 'annual')}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
        
        <div className="mt-2">
          {isFree ? (
            <div className="text-3xl font-bold text-green-600">
              Free
              <span className="text-sm font-normal text-gray-500 ml-1">forever</span>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold">
                {billingCycle === 'monthly' || !annualPrice ? (
                  <>{price}<span className="text-sm font-normal text-gray-500">/month</span></>
                ) : (
                  <>{annualPrice}<span className="text-sm font-normal text-gray-500">/year</span></>
                )}
              </div>
              {billingCycle === 'annual' && annualSavings && (
                <div className="text-sm text-green-600 font-medium mt-1">
                  {annualSavings}
                </div>
              )}
            </>
          )}
          
          {!isFree && showLocalCurrency && localCurrencyInfo.code !== 'USD' && (
            <div className="text-sm text-gray-500 italic mt-1">
              {billingCycle === 'monthly' || !annualPrice ? (
                <>{convertAndFormat(monthlyPriceValue)}/month</>
              ) : (
                <>{convertAndFormat(annualPriceValue)}/year</>
              )}
            </div>
          )}
        </div>
        {additionalInfo && (
          <Badge variant="custom" className={`mt-2 bg-${color}/10 text-${color} border border-${color}/20`}>
            {additionalInfo}
          </Badge>
        )}
      </CardHeader>
      <CardContent className={`relative z-10 ${isHighlighted ? 'bg-white bg-opacity-90' : ''}`}>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`h-5 w-5 ${feature.highlight ? 'text-amber-600' : 'text-green-500'} mr-2 shrink-0 ${feature.highlight ? 'font-bold' : ''}`} />
              <span className={feature.highlight ? 'font-bold text-amber-700' : ''}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className={`${isHighlighted ? 'flex flex-col gap-2' : ''} relative z-10 ${isHighlighted ? 'bg-white' : ''}`}>
        <Button 
          className={`w-full ${isFree ? 'bg-green-500 hover:bg-green-600' : `bg-${color} hover:bg-${color === 'muslim-gold' ? 'amber-500' : color + '/90'}`} ${isHighlighted ? 'font-bold' : ''}`}
          onClick={onPrimaryClick}
        >
          {primaryButtonText}
        </Button>
        {secondaryButtonText && (
          <Button 
            variant="outline" 
            className="w-full border-muslim-gold text-muslim-gold hover:bg-amber-50"
            onClick={onSecondaryClick}
          >
            {secondaryButtonText}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
