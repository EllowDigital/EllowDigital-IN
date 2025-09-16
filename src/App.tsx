import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import { AxiosInterceptor } from "@/utils/axiosInterceptor";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import TeamPage from "./pages/TeamPage";
import RefundPolicy from "./pages/RefundPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import PortfolioPage from "./pages/PortfolioPage";

import { initPerformanceOptimizations } from "@/utils/performanceUtils";
import { initPerformanceMonitoring } from "@/utils/performanceMonitoring";
import {
  optimizeImageLoading,
  handleBrokenImages,
} from "@/utils/assets/imageOptimization";
import { deferNonCriticalResources } from "@/utils/assets/resourceOptimization";
import { validateLinksAfterLoad } from "@/utils/linkValidationUtils";

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      networkMode: "offlineFirst",
    },
  },
});

const isDev = process.env.NODE_ENV === "development";

const App = () => {
  useEffect(() => {
    // Init performance monitoring
    const cleanupPerformance = initPerformanceOptimizations();
    initPerformanceMonitoring();

    // Init asset-related optimizations
    const cleanupImageLoading = optimizeImageLoading();
    const cleanupBrokenImages = handleBrokenImages();
    const cleanupResourceOptimization = deferNonCriticalResources();

    // Dev-only link validation
    let cleanupLinkValidation = () => {};
    if (isDev) {
      cleanupLinkValidation = validateLinksAfterLoad({
        autoFix: false,
        consoleOutput: true,
      });
    }

    return () => {
      cleanupPerformance();
      cleanupImageLoading();
      cleanupBrokenImages();
      cleanupResourceOptimization();
      cleanupLinkValidation();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <TooltipProvider>
          <SkipToContent />
          <AxiosInterceptor />

          {/* Notifications */}
          <Toaster />
          <Sonner />

          {/* App Routes */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
