
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import AILab from "./pages/AILab";
import CaseStudies from "./pages/CaseStudies";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";
import HubSpotExpert from "./pages/HubSpotExpert";
import AwsCdpPipeline from "./pages/AwsCdpPipeline";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ai-lab" element={<AILab />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/hubspot-expert" element={<HubSpotExpert />} />
          <Route path="/aws-cdp-pipeline" element={<AwsCdpPipeline />} />
          {/* Redirects */}
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/contact" element={<Navigate to="/resume" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
