
import { Button } from "@/components/ui/button";

type DateRange = "7d" | "30d" | "90d" | "all";

interface DateRangeSelectorProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

const DateRangeSelector = ({ dateRange, setDateRange }: DateRangeSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant={dateRange === "7d" ? "default" : "outline"} 
        className={dateRange === "7d" ? "bg-muslim-teal" : ""}
        onClick={() => setDateRange("7d")}
      >
        7 Days
      </Button>
      <Button 
        variant={dateRange === "30d" ? "default" : "outline"} 
        className={dateRange === "30d" ? "bg-muslim-teal" : ""}
        onClick={() => setDateRange("30d")}
      >
        30 Days
      </Button>
      <Button 
        variant={dateRange === "90d" ? "default" : "outline"} 
        className={dateRange === "90d" ? "bg-muslim-teal" : ""}
        onClick={() => setDateRange("90d")}
      >
        90 Days
      </Button>
      <Button 
        variant={dateRange === "all" ? "default" : "outline"} 
        className={dateRange === "all" ? "bg-muslim-teal" : ""}
        onClick={() => setDateRange("all")}
      >
        All Time
      </Button>
    </div>
  );
};

export default DateRangeSelector;
