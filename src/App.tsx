
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { LocationProvider } from "./contexts/LocationContext";
import Index from "./pages/Index";
import BusinessesPage from "./pages/businesses";
import MosquesPage from "./pages/mosques";
import MosqueDetailPage from "./pages/mosque-detail/MosqueDetailPage";
import AboutPage from "./pages/About";
import PackagesPage from "./pages/Packages";
import SalesPage from "./pages/Sales";
import AffiliatesPage from "./pages/Affiliates";
import CommunityEventsPage from "./pages/CommunityEvents";
import CommunityPage from "./pages/community"; 
import DashboardPage from "./pages/dashboard"; 
import HelpPage from "./pages/help";
import MembershipPage from "./pages/Membership";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import BusinessProfile from "./pages/business-profile";
import CharitiesPage from "./pages/Charities";
import StaffDashboard from "./pages/StaffDashboard";
import EmailTest from "@/components/EmailTest";
import React from 'react';

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LocationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/businesses" element={<BusinessesPage />} />
            <Route path="/mosques" element={<MosquesPage />} />
            <Route path="/mosque/:id" element={<MosqueDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/affiliates" element={<AffiliatesPage />} />
            <Route path="/community-events" element={<CommunityEventsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/business-profile" element={<BusinessProfile />} />
            <Route path="/business-profile/:id" element={<BusinessProfile />} />
            <Route path="/charities" element={<CharitiesPage />} />
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/email-test" element={<EmailTest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </LocationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
