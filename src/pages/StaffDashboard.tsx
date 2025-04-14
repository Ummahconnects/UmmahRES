
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart3, Globe, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import AuthRequired from "@/components/auth/AuthRequired";
import DateRangeSelector from "@/components/dashboard/DateRangeSelector";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import OverviewTab from "@/components/dashboard/tabs/OverviewTab";
import SignupsTab from "@/components/dashboard/tabs/SignupsTab";
import LocationsTab from "@/components/dashboard/tabs/LocationsTab";
import BetaTab from "@/components/dashboard/tabs/BetaTab";
import StaffDashboardHeader from "@/components/dashboard/StaffDashboardHeader";

const StaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "all">("30d");
  
  useEffect(() => {
    if (!user || !user.email?.endsWith('@ummahconnects.com')) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <StaffDashboardHeader dateRange={dateRange} />
          <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        
        <DashboardMetrics dateRange={dateRange} />
        
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">
              <PieChart className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="signups">
              <BarChart3 className="h-4 w-4 mr-2" />
              Signups
            </TabsTrigger>
            <TabsTrigger value="locations">
              <Globe className="h-4 w-4 mr-2" />
              Locations
            </TabsTrigger>
            <TabsTrigger value="beta">
              <Calendar className="h-4 w-4 mr-2" />
              Beta Program
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="signups">
            <SignupsTab />
          </TabsContent>
          
          <TabsContent value="locations">
            <LocationsTab dateRange={dateRange} />
          </TabsContent>
          
          <TabsContent value="beta">
            <BetaTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StaffDashboard;
