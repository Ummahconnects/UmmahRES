
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SignupChart from "@/components/analytics/SignupChart";
import LocationBreakdown from "@/components/analytics/LocationBreakdown";
import SignupTable from "@/components/analytics/SignupTable";

interface OverviewTabProps {
  dateRange: "7d" | "30d" | "90d" | "all";
}

const OverviewTab = ({ dateRange }: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Signup Trends</CardTitle>
          <CardDescription>Business signups over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <SignupChart dateRange={dateRange} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Top Locations</CardTitle>
          <CardDescription>Signups by city</CardDescription>
        </CardHeader>
        <CardContent>
          <LocationBreakdown dateRange={dateRange} type="city" />
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Recent Signups</CardTitle>
          <CardDescription>Latest business memberships</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupTable limit={5} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
