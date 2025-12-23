import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import { AxiosInterceptor } from "@/utils/axiosInterceptor";
import AnimatedOutlet from "@/components/AnimatedOutlet";
import CookieConsent from "@/components/CookieConsent";

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

const AppLayout = () => (
  <TooltipProvider>
    <SkipToContent />
    <AxiosInterceptor />

    {/* Notifications */}
    <Toaster />
    <Sonner />

    <AnimatedOutlet />
    
    {/* Cookie Consent Banner */}
    <CookieConsent />
  </TooltipProvider>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Index /> },
        { path: "portfolio", element: <PortfolioPage /> },
        { path: "privacy-policy", element: <PrivacyPolicy /> },
        { path: "terms-of-service", element: <TermsOfService /> },
        { path: "refund-policy", element: <RefundPolicy /> },
        { path: "cookies-policy", element: <CookiesPolicy /> },
        { path: "team", element: <TeamPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

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
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
