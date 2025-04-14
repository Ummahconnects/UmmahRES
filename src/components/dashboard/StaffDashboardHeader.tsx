
import { ArrowUpRight } from "lucide-react";

interface StaffDashboardHeaderProps {
  dateRange: "7d" | "30d" | "90d" | "all";
}

const StaffDashboardHeader = ({ dateRange }: StaffDashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-muslim-dark">Staff Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor business signups, growth metrics, and platform analytics</p>
      </div>
    </div>
  );
};

export default StaffDashboardHeader;
