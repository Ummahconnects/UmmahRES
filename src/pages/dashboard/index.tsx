
import { useAuth } from "@/hooks/auth/useAuth";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import PrayerTimesWidget from "./widgets/PrayerTimesWidget";
import WeatherWidget from "./widgets/WeatherWidget";
import QuranWidget from "./widgets/QuranWidget";
import EventsWidget from "./widgets/EventsWidget";
import CommunityWidget from "./widgets/CommunityWidget";
import AuthRequired from "@/components/auth/AuthRequired";

const DashboardPage = () => {
  return (
    <Layout>
      <AuthRequired>
        <SidebarProvider defaultOpen={true}>
          <div className="flex">
            <Sidebar>
              <SidebarContent>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
                  {/* Sidebar content here if needed */}
                </div>
              </SidebarContent>
            </Sidebar>
            
            <SidebarInset>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-muslim-dark mb-8">Your Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Prayer Times Widget */}
                  <Card className="p-4 shadow-md">
                    <h3 className="text-lg font-semibold mb-3">Prayer Times</h3>
                    <PrayerTimesWidget />
                  </Card>
                  
                  {/* Weather Widget */}
                  <Card className="p-4 shadow-md">
                    <h3 className="text-lg font-semibold mb-3">Weather</h3>
                    <WeatherWidget />
                  </Card>
                  
                  {/* Quran Widget */}
                  <Card className="p-4 shadow-md">
                    <h3 className="text-lg font-semibold mb-3">Daily Quran</h3>
                    <QuranWidget />
                  </Card>
                  
                  {/* Events Widget */}
                  <Card className="p-4 shadow-md">
                    <h3 className="text-lg font-semibold mb-3">Upcoming Events</h3>
                    <EventsWidget />
                  </Card>
                  
                  {/* Community Widget */}
                  <Card className="p-4 shadow-md">
                    <h3 className="text-lg font-semibold mb-3">Community Discussions</h3>
                    <CommunityWidget />
                  </Card>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </AuthRequired>
    </Layout>
  );
};

export default DashboardPage;
