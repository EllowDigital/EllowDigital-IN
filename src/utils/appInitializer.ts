/**
 * Application initialization utility
 * Handles all setup tasks that need to run when the app starts
 */

import { initPerformanceOptimizations } from "./performanceUtils";
import { initializePerformanceMonitoring } from "./performanceMonitor";
import { initPerformanceMonitoring as initWebVitalsMonitoring } from "./performanceMonitoring";
import { toast } from "sonner";

/**
 * Initialize all application services and optimizations
 */
export const initializeApplication = () => {
  // Set up global error handling
  setupGlobalErrorHandling();

  // Initialize performance optimizations
  const cleanupPerformance = initPerformanceOptimizations();

  // Initialize performance monitoring
  initializePerformanceMonitoring();
  initWebVitalsMonitoring();

  // Optimize image loading
  optimizeImageLoading();

  // Apply responsive optimizations
  applyResponsiveOptimizations();

  // Return cleanup function for performance optimizations
  return () => cleanupPerformance();
};

/**
 * Set up global error handling
 */
const setupGlobalErrorHandling = () => {
  if (typeof window !== "undefined") {
    // Store the original error handler
    const originalOnError = window.onerror;

    // Set up global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("Global error caught:", {
        message,
        source,
        lineno,
        colno,
        error,
      });

      // Show user-friendly toast message
      toast.error("Something went wrong", {
        description: "The application encountered an error",
        duration: 5000,
      });

      // Call the original error handler, if defined
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }

      // Return false to allow default browser error handling
      return false;
    };

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason);

      toast.error("Background operation failed", {
        duration: 4000,
      });
    });
  }
};

/**
 * Optimize image loading across the site
 */
const optimizeImageLoading = () => {
  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    // Create observer for lazy loading
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            if (image.dataset.src) {
              // Replace src with data-src when image becomes visible
              image.src = image.dataset.src;
              image.removeAttribute("data-src");
              imageObserver.unobserve(image); // Stop observing the image once loaded
            }
          }
        });
      },
      {
        rootMargin: "200px 0px", // Start loading before the image is visible
        threshold: 0.01, // Trigger when just 1% visible
      }
    );

    // Find all images with data-src attribute and observe them
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));

    // Enable native lazy loading for browsers that support it
    if ("loading" in HTMLImageElement.prototype) {
      const images = document.querySelectorAll("img.lazy:not([data-src])");
      images.forEach((img) => {
        (img as HTMLImageElement).loading = "lazy";
      });
    }
  }
};

/**
 * Apply responsive optimizations based on device capabilities
 */
const applyResponsiveOptimizations = () => {
  if (typeof window !== "undefined") {
    // Check if the device supports touch events
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as unknown as { msMaxTouchPoints: number }).msMaxTouchPoints >
        0;
    document.body.classList.add(isTouchDevice ? "touch-device" : "no-touch");

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      document.body.classList.add("reduced-motion");
    }

    // Check for data saver mode based on network connection
    if ("connection" in navigator) {
      const connection = (
        navigator as unknown as { connection: { saveData: boolean } }
      ).connection;
      if (connection && connection.saveData) {
        document.body.classList.add("data-saver");
      }
    }

    // Update font size based on viewport width
    updateResponsiveFontSize();
    window.addEventListener("resize", updateResponsiveFontSize);
  }
};

/**
 * Update root font size based on viewport width for better responsiveness
 */
const updateResponsiveFontSize = () => {
  const minWidth = 320; // Minimum viewport width
  const maxWidth = 1920; // Maximum viewport width
  const minFontSize = 14; // Minimum font size in px
  const maxFontSize = 18; // Maximum font size in px

  const width = window.innerWidth;

  // Calculate font size based on viewport width using linear interpolation
  const fontSize =
    width <= minWidth
      ? minFontSize
      : width >= maxWidth
      ? maxFontSize
      : minFontSize +
        ((width - minWidth) / (maxWidth - minWidth)) *
          (maxFontSize - minFontSize);

  // Apply font size to the root element (affects rem units)
  document.documentElement.style.fontSize = `${fontSize}px`;
};
