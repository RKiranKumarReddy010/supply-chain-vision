import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BHScopeDashboard from "./pages/BHScopeDashboard.tsx";
import LeadForgeDashboard from "./pages/LeadForgeDashboard.tsx";
import Index from "./pages/Index.tsx";
import Products from "./pages/Products.tsx";
import Team from "./pages/Team.tsx";
import NotFound from "./pages/NotFound.tsx";
import MouseIndicator from "@/components/MouseIndicator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MouseIndicator />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/team" element={<Team />} />
          <Route path="/products/BHScope" element={<BHScopeDashboard />} />
          <Route path="/products/LeadForge" element={<LeadForgeDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
