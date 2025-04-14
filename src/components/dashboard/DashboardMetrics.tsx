
import GrowthMetricsCard from "@/components/analytics/GrowthMetricsCard";
import { Users, TrendingUp, MapPin } from "lucide-react";

interface DashboardMetricsProps {
  dateRange: "7d" | "30d" | "90d" | "all";
}

const DashboardMetrics = ({ dateRange }: DashboardMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <GrowthMetricsCard 
        title="Total Businesses" 
        value="1,284" 
        change="+12.4%" 
        timeframe={dateRange} 
        trend="up"
        icon={<Users className="h-5 w-5 text-muslim-teal" />}
      />
      
      <GrowthMetricsCard 
        title="Beta Program Signups" 
        value="248" 
        change="+32.7%" 
        timeframe={dateRange} 
        trend="up"
        icon={<TrendingUp className="h-5 w-5 text-muslim-gold" />}
      />
      
      <GrowthMetricsCard 
        title="Active Cities" 
        value="42" 
        change="+4" 
        timeframe={dateRange} 
        trend="up"
        icon={<MapPin className="h-5 w-5 text-muslim-blue" />}
      />
    </div>
  );
};

export default DashboardMetrics;
