
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";

interface GrowthMetricsCardProps {
  title: string;
  value: string;
  change: string;
  timeframe: string;
  trend: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

const GrowthMetricsCard = ({ title, value, change, timeframe, trend, icon }: GrowthMetricsCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-500 font-medium">{title}</h3>
          {icon}
        </div>
        <div className="flex items-end">
          <p className="text-3xl font-bold">{value}</p>
          <div className={`flex items-center ml-2 mb-1 ${
            trend === "up" ? "text-green-600" : 
            trend === "down" ? "text-red-600" : "text-gray-500"
          }`}>
            {trend === "up" ? <ChevronUp className="h-4 w-4" /> : 
             trend === "down" ? <ChevronDown className="h-4 w-4" /> : null}
            <span className="text-sm font-medium">{change}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {timeframe === "7d" ? "Past 7 days" : 
           timeframe === "30d" ? "Past 30 days" :
           timeframe === "90d" ? "Past 90 days" : "All time"}
        </p>
      </CardContent>
    </Card>
  );
};

export default GrowthMetricsCard;
