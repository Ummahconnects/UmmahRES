
import React from "react";
import { Check, BarChart3, Sparkles } from "lucide-react";

interface FeatureGridItem {
  title: string;
  features: string[];
  highlight?: boolean;
  icon?: React.ReactNode;
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
          <div 
            key={index} 
            className={`${item.highlight ? 'bg-gradient-to-br from-amber-50 to-white border-amber-200' : 'bg-white'} p-4 rounded-lg shadow-sm border`}
          >
            <div className="flex items-center mb-2">
              {item.icon && <div className="mr-2">{item.icon}</div>}
              <h3 className={`font-semibold text-lg ${item.highlight ? 'text-muslim-gold' : ''}`}>{item.title}</h3>
            </div>
            <ul className="space-y-2">
              {item.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className={`h-5 w-5 ${item.highlight ? 'text-amber-500' : 'text-green-500'} mr-2 shrink-0`} />
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
