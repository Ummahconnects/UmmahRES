
import React from "react";
import { Check } from "lucide-react";

interface FeatureGridItem {
  title: string;
  features: string[];
}

interface PackageFeatureGridProps {
  title: string;
  description: string;
  gridItems: FeatureGridItem[];
}

const PackageFeatureGrid = ({ title, description, gridItems }: PackageFeatureGridProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-16">
      <h2 className="text-2xl font-bold text-muslim-dark mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {gridItems.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <ul className="space-y-2">
              {item.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageFeatureGrid;
