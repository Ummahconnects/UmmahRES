
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Globe, Calendar, BarChart3, PieChart } from "lucide-react";
import GrowthMetricsCard from "@/components/analytics/GrowthMetricsCard";
import SignupChart from "@/components/analytics/SignupChart";
import LocationBreakdown from "@/components/analytics/LocationBreakdown";

interface CustomerAnalyticsProps {
  businessId: string;
}

const CustomerAnalytics = ({ businessId }: CustomerAnalyticsProps) => {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "all">("30d");
  
  // In a real app, this data would come from an API based on the businessId
  // For now, we're using mock data
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-muslim-dark">Business Analytics</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setDateRange("7d")}
            className={`px-3 py-1 text-sm rounded-md ${dateRange === "7d" ? "bg-muslim-teal text-white" : "bg-gray-100"}`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setDateRange("30d")}
            className={`px-3 py-1 text-sm rounded-md ${dateRange === "30d" ? "bg-muslim-teal text-white" : "bg-gray-100"}`}
          >
            30 Days
          </button>
          <button 
            onClick={() => setDateRange("90d")}
            className={`px-3 py-1 text-sm rounded-md ${dateRange === "90d" ? "bg-muslim-teal text-white" : "bg-gray-100"}`}
          >
            90 Days
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GrowthMetricsCard 
          title="Profile Views" 
          value="843" 
          change="+18.2%" 
          timeframe={dateRange}
          trend="up"
          icon={<Users className="h-5 w-5 text-muslim-teal" />}
        />
        
        <GrowthMetricsCard 
          title="Contact Clicks" 
          value="157" 
          change="+24.5%" 
          timeframe={dateRange}
          trend="up"
          icon={<TrendingUp className="h-5 w-5 text-muslim-gold" />}
        />
        
        <GrowthMetricsCard 
          title="Search Appearances" 
          value="1,240" 
          change="+12.7%" 
          timeframe={dateRange}
          trend="up"
          icon={<BarChart3 className="h-5 w-5 text-muslim-blue" />}
        />
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="locations">
            <Globe className="h-4 w-4 mr-2" />
            Visitor Locations
          </TabsTrigger>
          <TabsTrigger value="trends">
            <Calendar className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Profile Performance</CardTitle>
              <CardDescription>Engagement metrics over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <SignupChart dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="locations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Visitors by Country</CardTitle>
                <CardDescription>Where your profile viewers come from</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LocationBreakdown dateRange={dateRange} type="country" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Visitors by City</CardTitle>
                <CardDescription>Top cities your profile is viewed from</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LocationBreakdown dateRange={dateRange} type="city" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Weekly Trends</CardTitle>
              <CardDescription>Performance trends over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <SignupChart dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerAnalytics;
