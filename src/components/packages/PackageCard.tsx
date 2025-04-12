
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PackageFeature {
  text: string;
  highlight?: boolean;
}

export interface PackageCardProps {
  title: string;
  description: string;
  price: string;
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
}

const PackageCard = ({
  title,
  description,
  price,
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
}: PackageCardProps) => {
  return (
    <Card className={`border-t-4 border-t-${color} relative ${isHighlighted ? 'md:scale-105 shadow-xl overflow-hidden' : ''}`}>
      {banner && (
        <div className="absolute -top-4 right-0 left-0 mx-auto w-max px-4 py-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-muslim-dark text-sm font-bold rounded-full border border-amber-300 shadow-md animate-pulse">
          {banner}
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
        <div className="text-3xl font-bold mt-2">
          {price}<span className="text-sm font-normal text-gray-500">/month</span>
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
          className={`w-full bg-${color} hover:bg-${color === 'muslim-gold' ? 'amber-500' : color + '/90'} ${isHighlighted ? 'font-bold' : ''}`}
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
