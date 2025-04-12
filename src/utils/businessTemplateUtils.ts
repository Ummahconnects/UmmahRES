
import { Briefcase, Building, Store, MapPin, ShoppingBag, Users } from "lucide-react";
import React from "react";

export type BusinessCategory = 
  | "retail" 
  | "restaurant" 
  | "professional" 
  | "healthcare" 
  | "education" 
  | "technology" 
  | "manufacturing"
  | "other";

interface TemplateStyles {
  bgColor: string;
  textColor: string;
  accentColor: string;
  icon: React.ReactNode;
  bannerUrl: string;
}

export const getTemplateStyles = (category: BusinessCategory): TemplateStyles => {
  switch (category) {
    case "retail":
      return {
        bgColor: "bg-blue-500",
        textColor: "text-blue-500",
        accentColor: "border-blue-500",
        icon: <ShoppingBag />,
        bannerUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format"
      };
    case "restaurant":
      return {
        bgColor: "bg-amber-500",
        textColor: "text-amber-500",
        accentColor: "border-amber-500",
        icon: <Store />,
        bannerUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format"
      };
    case "professional":
      return {
        bgColor: "bg-green-500",
        textColor: "text-green-500",
        accentColor: "border-green-500",
        icon: <Briefcase />,
        bannerUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format"
      };
    case "healthcare":
      return {
        bgColor: "bg-purple-500",
        textColor: "text-purple-500",
        accentColor: "border-purple-500",
        icon: <Users />,
        bannerUrl: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1600&auto=format"
      };
    case "education":
      return {
        bgColor: "bg-indigo-500",
        textColor: "text-indigo-500",
        accentColor: "border-indigo-500",
        icon: <Users />,
        bannerUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600&auto=format"
      };
    case "technology":
      return {
        bgColor: "bg-cyan-500",
        textColor: "text-cyan-500",
        accentColor: "border-cyan-500",
        icon: <Briefcase />,
        bannerUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format"
      };
    case "manufacturing":
      return {
        bgColor: "bg-orange-500",
        textColor: "text-orange-500",
        accentColor: "border-orange-500",
        icon: <Building />,
        bannerUrl: "https://images.unsplash.com/photo-1565374738333-9b93be87313c?q=80&w=1600&auto=format"
      };
    default:
      return {
        bgColor: "bg-muslim-teal",
        textColor: "text-muslim-teal",
        accentColor: "border-muslim-teal",
        icon: <MapPin />,
        bannerUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format"
      };
  }
};

export const generateAvatarForBusiness = (businessName: string): string => {
  // Generate a color based on the business name
  const hash = businessName.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Create a hue between 0 and 360 based on the hash
  const hue = hash % 360;
  
  return `hsl(${hue}, 70%, 50%)`;
};
