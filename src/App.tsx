import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BHScopeDashboard from "./pages/BHScopeDashboard.tsx";
import LeadForgeDashboard from "./pages/LeadForgeDashboard.tsx";
import VeritasAIDashboard from "./pages/VeritasAIDashboard.tsx";
import SoftSolutionDashboard from "./pages/SoftSolutionDashboard.tsx";
import Index from "./pages/Index.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import ProcessPage from "./pages/ProcessPage.tsx";
import WorkPage from "./pages/WorkPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Products from "./pages/Products.tsx";
import Team from "./pages/Team.tsx";
import NotFound from "./pages/NotFound.tsx";
import ConsentModal from "@/components/ConsentModal";
import MouseIndicator from "@/components/MouseIndicator";

import ClickSpark from "@/components/ui/ClickSpark";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Toaster />
        <Sonner />
        <ConsentModal />
        <BrowserRouter>
          <MouseIndicator />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/solutions" element={<WorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/consult" element={<ContactPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/team" element={<Team />} />
            <Route path="/products/BHScope" element={<BHScopeDashboard />} />
            <Route path="/products/LeadForge" element={<LeadForgeDashboard />} />
            <Route path="/products/VeritasAI" element={<VeritasAIDashboard />} />
            <Route path="/products/veritas" element={<VeritasAIDashboard />} />
            <Route path="/softsolution" element={<SoftSolutionDashboard />} />
            <Route path="/softsolutions" element={<SoftSolutionDashboard />} />
            <Route path="/products/softsolution" element={<SoftSolutionDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ClickSpark>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
