/**
 * Performance monitoring and optimization utilities
 */

import { useEffect, useRef, useState } from "react";

// Constants for performance thresholds
const RENDER_THRESHOLD_MS = 16; // ~60fps
const LONG_TASK_THRESHOLD_MS = 50;

/**
 * Initialize performance monitoring for the application
 */
export const initializePerformanceMonitoring = () => {
  // Only run in production
  if (process.env.NODE_ENV !== "production") return;

  // Monitor long tasks (tasks longer than LONG_TASK_THRESHOLD_MS)
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log critical performance issues (tasks taking more than 2x the threshold)
          if (entry.duration > LONG_TASK_THRESHOLD_MS * 2) {
            console.warn("Critical performance issue detected:", {
              duration: `${Math.round(entry.duration)}ms`,
              name: entry.name,
            });
          }
        });
      });

      observer.observe({ entryTypes: ["longtask"] });
    } catch (error) {
      // Silent fail for unsupported browsers
      console.error("PerformanceObserver not supported:", error);
    }
  }

  // Light-weight page load metrics
  window.addEventListener("load", () => {
    setTimeout(() => {
      if ("performance" in window) {
        const pageNavigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        if (pageNavigation) {
          console.info(
            "Page loaded in:",
            `${Math.round(
              pageNavigation.loadEventEnd - pageNavigation.startTime
            )}ms`
          );
        }
      }
    }, 0);
  });
};

/**
 * Custom hook to track component render performance
 * @param componentName Name of the component being monitored
 */
export const useRenderPerformance = (componentName: string) => {
  const renderStart = useRef<number | undefined>(undefined);

  // Monitor render time only in development mode
  if (process.env.NODE_ENV === "development") {
    renderStart.current = performance.now();

    useEffect(() => {
      if (renderStart.current) {
        const renderTime = performance.now() - renderStart.current;
        if (renderTime > RENDER_THRESHOLD_MS) {
          console.warn(
            `Slow render detected in ${componentName}: ${Math.round(
              renderTime
            )}ms`
          );
        }
      }
    });
  }
};

/**
 * Custom hook to defer expensive operations until after main render
 * @param callback Function to be executed
 * @param deps Dependency array for the effect
 */
export const useDeferredEffect = (
  callback: () => void | (() => void),
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    // Use requestIdleCallback if available, otherwise fallback to setTimeout
    const callbackFn =
      typeof requestIdleCallback !== "undefined"
        ? () => requestIdleCallback(callback)
        : () => setTimeout(callback, 1);

    callbackFn();

    // Cleanup function in case of any side effects
    return () => {
      if (typeof cancelIdleCallback !== "undefined") {
        cancelIdleCallback(callbackFn);
      } else {
        clearTimeout(callbackFn);
      }
    };
  }, deps);
};

/**
 * Custom hook to lazy load components or data when they become visible
 * @param options Intersection observer options
 */
export const useInView = (options = {}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
        ...options,
      }
    );

    observer.observe(ref);

    // Cleanup the observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isInView] as const;
};

/**
 * Function to optimize image loading
 * @param imageElement Image element to optimize
 * @param src Source URL of the image
 * @param placeholder Placeholder image URL
 */
export const optimizeImage = (
  imageElement: HTMLImageElement,
  src: string,
  placeholder: string = "/placeholder.svg"
) => {
  // Set placeholder immediately for a smoother user experience
  imageElement.src = placeholder;

  // Create new image object to preload
  const img = new Image();

  // When image loads, replace the src with the actual image
  img.onload = () => {
    imageElement.src = src;
    imageElement.classList.add("loaded");
  };

  // Handle errors by reverting to placeholder image
  img.onerror = () => {
    console.error(`Failed to load image: ${src}`);
    imageElement.src = placeholder;
  };

  // Start loading the real image
  img.src = src;
};

// Simplified performance debugging tool for development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).__PERFORMANCE_MONITOR__ = {
    getMetrics: () => {
      if ("performance" in window) {
        return {
          navigation: performance.getEntriesByType("navigation"),
          resources: performance.getEntriesByType("resource").slice(0, 10),
        };
      }
      return "Performance API not available";
    },
  };
}
