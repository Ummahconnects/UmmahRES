
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Briefcase, Store, Building, ShoppingBag, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BusinessTemplate {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  bannerImage: string;
  logoPlaceholder: React.ReactNode;
}

interface BusinessTemplatesProps {
  onSelectTemplate: (template: BusinessTemplate) => void;
  selectedTemplateId?: string;
}

const BusinessTemplates = ({ onSelectTemplate, selectedTemplateId }: BusinessTemplatesProps) => {
  const templates: BusinessTemplate[] = [
    {
      id: "retail",
      name: "Retail Store",
      description: "For shops, boutiques, and retail businesses",
      color: "bg-blue-500",
      icon: <Store className="h-5 w-5" />,
      bannerImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format",
      logoPlaceholder: <ShoppingBag className="h-14 w-14 text-blue-500" />,
    },
    {
      id: "service",
      name: "Service Provider",
      description: "For consultants, professionals, and service providers",
      color: "bg-green-500",
      icon: <Briefcase className="h-5 w-5" />,
      bannerImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600&auto=format",
      logoPlaceholder: <Users className="h-14 w-14 text-green-500" />,
    },
    {
      id: "food",
      name: "Food & Restaurant",
      description: "For restaurants, cafes, and food services",
      color: "bg-amber-500",
      icon: <Store className="h-5 w-5" />,
      bannerImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format",
      logoPlaceholder: <Store className="h-14 w-14 text-amber-500" />,
    },
    {
      id: "office",
      name: "Corporate Office",
      description: "For business offices and corporate services",
      color: "bg-purple-500",
      icon: <Building className="h-5 w-5" />,
      bannerImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format",
      logoPlaceholder: <Building className="h-14 w-14 text-purple-500" />,
    },
    {
      id: "local",
      name: "Local Business",
      description: "For neighborhood and community-focused businesses",
      color: "bg-muslim-teal",
      icon: <MapPin className="h-5 w-5" />,
      bannerImage: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1600&auto=format",
      logoPlaceholder: <MapPin className="h-14 w-14 text-muslim-teal" />,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Business Templates</h3>
      <p className="text-sm text-gray-500">
        Choose a template to quickly create your business profile with professional styling.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={cn(
              "cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden border-2",
              selectedTemplateId === template.id ? "border-muslim-teal" : "border-transparent"
            )}
            onClick={() => onSelectTemplate(template)}
          >
            {selectedTemplateId === template.id && (
              <div className="absolute top-2 right-2 bg-muslim-teal text-white rounded-full p-1 z-10">
                <Check className="h-4 w-4" />
              </div>
            )}
            <div className="h-32 overflow-hidden">
              <img
                src={template.bannerImage}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={`p-1 rounded-full ${template.color} text-white`}>
                  {template.icon}
                </span>
                <span className="font-medium">{template.name}</span>
              </div>
              <p className="text-sm text-gray-500">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessTemplates;
