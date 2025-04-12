
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import BusinessesPage from "./pages/Businesses";
import MosquesPage from "./pages/Mosques";
import MosqueDetail from "./pages/MosqueDetail";
import AboutPage from "./pages/About";
import PackagesPage from "./pages/Packages";
import SalesPage from "./pages/Sales";
import AffiliatesPage from "./pages/Affiliates";
import CommunityEventsPage from "./pages/CommunityEvents";
import HelpPage from "./pages/Help";
import MembershipPage from "./pages/Membership";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import BusinessProfile from "./pages/BusinessProfile";
import CharitiesPage from "./pages/Charities";
import React from 'react'; // Explicitly import React

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/businesses" element={<BusinessesPage />} />
            <Route path="/mosques" element={<MosquesPage />} />
            <Route path="/mosque/:id" element={<MosqueDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/affiliates" element={<AffiliatesPage />} />
            <Route path="/community-events" element={<CommunityEventsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/business-profile" element={<BusinessProfile />} />
            <Route path="/business-profile/:id" element={<BusinessProfile />} />
            <Route path="/charities" element={<CharitiesPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
