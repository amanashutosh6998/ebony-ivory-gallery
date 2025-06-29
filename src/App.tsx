
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import AILab from "./pages/AILab";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";
import HubSpotExpert from "./pages/HubSpotExpert";
import AwsCdpPipeline from "./pages/AwsCdpPipeline";
import OperationsAutomations from "./pages/OperationsAutomations";
import GrowthStrategy from "./pages/GrowthStrategy";
import Analytics from "./pages/Analytics";
import MusicProduction from "./pages/MusicProduction";
import ContentExtractor from "./pages/ContentExtractor";
import ChatbotWidget from "./components/ChatbotWidget";

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
          <Route path="/case-study/:slug" element={<CaseStudyDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/hubspot-expert" element={<HubSpotExpert />} />
          <Route path="/aws-cdp-pipeline" element={<AwsCdpPipeline />} />
          <Route path="/operations-automations" element={<OperationsAutomations />} />
          <Route path="/growth-strategy" element={<GrowthStrategy />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/music-production" element={<MusicProduction />} />
          <Route path="/content-extractor" element={<ContentExtractor />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/contact" element={<Navigate to="/resume" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ChatbotWidget />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
