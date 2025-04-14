
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import LocationBreakdown from "@/components/analytics/LocationBreakdown";

interface LocationsTabProps {
  dateRange: "7d" | "30d" | "90d" | "all";
}

const LocationsTab = ({ dateRange }: LocationsTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Signups by Country</CardTitle>
          <CardDescription>Business distribution by country</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <LocationBreakdown dateRange={dateRange} type="country" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Signups by City</CardTitle>
          <CardDescription>Business distribution by city</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <LocationBreakdown dateRange={dateRange} type="city" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationsTab;
