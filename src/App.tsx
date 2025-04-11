
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BusinessesPage from "./pages/Businesses";
import MosquesPage from "./pages/Mosques";
import MosqueDetail from "./pages/MosqueDetail";
import AboutPage from "./pages/About";
import PackagesPage from "./pages/Packages";
import SalesPage from "./pages/Sales";
import NotFound from "./pages/NotFound";
import React from 'react'; // Explicitly import React

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
