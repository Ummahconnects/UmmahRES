import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, Users, Globe, MapPin, ChevronUp, ChevronDown, Calendar, PieChart, BarChart3, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignupChart from "@/components/analytics/SignupChart";
import GrowthMetricsCard from "@/components/analytics/GrowthMetricsCard";
import LocationBreakdown from "@/components/analytics/LocationBreakdown";
import SignupTable from "@/components/analytics/SignupTable";
import AuthRequired from "@/components/auth/AuthRequired";

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
          <div>
            <h1 className="text-3xl font-bold text-muslim-dark">Staff Analytics Dashboard</h1>
            <p className="text-gray-600">Monitor business signups, growth metrics, and platform analytics</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
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
        </div>
        
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
          </TabsContent>
          
          <TabsContent value="signups">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Business Signups</CardTitle>
                  <CardDescription>Detailed breakdown of new businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <SignupTable limit={10} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="locations">
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
          </TabsContent>
          
          <TabsContent value="beta">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Beta Program Progress</CardTitle>
                  <CardDescription>Track cities reaching 100 business benchmark</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>City</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Beta Signups</TableHead>
                        <TableHead>Discount Applied</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">London</TableCell>
                        <TableCell>United Kingdom</TableCell>
                        <TableCell>82</TableCell>
                        <TableCell>£1,640</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-muslim-teal h-2.5 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                        </TableCell>
                        <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">New York</TableCell>
                        <TableCell>United States</TableCell>
                        <TableCell>67</TableCell>
                        <TableCell>$1,340</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-muslim-teal h-2.5 rounded-full" style={{ width: '67%' }}></div>
                          </div>
                        </TableCell>
                        <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Dubai</TableCell>
                        <TableCell>UAE</TableCell>
                        <TableCell>53</TableCell>
                        <TableCell>$1,060</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-muslim-teal h-2.5 rounded-full" style={{ width: '53%' }}></div>
                          </div>
                        </TableCell>
                        <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Kuala Lumpur</TableCell>
                        <TableCell>Malaysia</TableCell>
                        <TableCell>46</TableCell>
                        <TableCell>$920</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-muslim-teal h-2.5 rounded-full" style={{ width: '46%' }}></div>
                          </div>
                        </TableCell>
                        <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Toronto</TableCell>
                        <TableCell>Canada</TableCell>
                        <TableCell>100</TableCell>
                        <TableCell>$2,000</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-muslim-gold h-2.5 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </TableCell>
                        <TableCell><span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">Completed</span></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StaffDashboard;
