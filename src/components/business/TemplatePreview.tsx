
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BusinessTemplate } from "./BusinessTemplates";
import { cn } from "@/lib/utils";

interface TemplatePreviewProps {
  template: BusinessTemplate;
  businessName: string;
  category?: string;
  description?: string;
}

const TemplatePreview = ({ 
  template, 
  businessName, 
  category = "Business Category",
  description = "This is where your business description will appear. Include information about your services and what makes your business unique."
}: TemplatePreviewProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Template Preview</h3>
      <div className="border rounded-lg overflow-hidden shadow-sm">
        {/* Banner Image */}
        <div className="h-48 relative">
          <img
            src={template.bannerImage}
            alt="Business Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute -bottom-10 left-6 h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center">
            {template.logoPlaceholder}
          </div>
        </div>
        
        {/* Business Information */}
        <div className="pt-12 px-6 pb-6">
          <h2 className="text-2xl font-bold">{businessName || "Your Business Name"}</h2>
          <div className={cn("text-sm px-2 py-1 rounded-full w-fit mt-2", template.color, "bg-opacity-10")}>
            {category}
          </div>
          
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-medium mb-2">About Us</h3>
              <p className="text-gray-600">{description}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Contact Information</h3>
              <div className="space-y-1 text-gray-600">
                <p>📞 Your Phone Number</p>
                <p>✉️ Your Email Address</p>
                <p>🌐 Your Website (Optional)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 italic">
        This is a preview of how your business profile will look. You can customize all details after selecting a template.
      </p>
    </div>
  );
};

export default TemplatePreview;
