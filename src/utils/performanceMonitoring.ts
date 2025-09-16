/**
 * Performance monitoring utilities
 * Web Vitals tracking and reporting for production monitoring
 */

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV !== "production") return;

  // Track Core Web Vitals metrics
  trackWebVitals();

  // Set up custom error tracking
  setupErrorTracking();
};

// Track Core Web Vitals metrics and send data to analytics
const trackWebVitals = async () => {
  try {
    const webVitals = await import("web-vitals");

    webVitals.onCLS(sendToAnalytics);
    webVitals.onFID(sendToAnalytics);
    webVitals.onLCP(sendToAnalytics);
    webVitals.onFCP(sendToAnalytics);
    webVitals.onTTFB(sendToAnalytics);
  } catch (error) {
    console.error("Failed to load web-vitals:", error);
  }
};

// Report Web Vitals metrics to analytics
const sendToAnalytics = (metric) => {
  const { name, value, id } = metric;

  console.log("Reporting metric:", { name, value, id });

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, {
      value: Math.round(value * 1000) / 1000,
      metric_id: id,
      metric_name: name,
      metric_value: value,
    });
  }
};

// Set up error tracking, including unhandled errors and promise rejections
const setupErrorTracking = () => {
  const originalOnError = window.onerror;

  window.onerror = (message, source, lineno, colno, error) => {
    console.error("Captured error:", { message, source, lineno, colno, error });

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "javascript_error", {
        error_message: message,
        error_source: source,
        error_lineno: lineno,
        error_colno: colno,
        error_stack: error?.stack,
      });
    }

    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }

    return false;
  };

  window.addEventListener("unhandledrejection", (event) => {
    const { reason } = event;
    console.error("Unhandled promise rejection:", reason);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "unhandled_promise_rejection", {
        error_message: reason?.message || "Unknown promise rejection",
        error_stack: reason?.stack,
      });
    }
  });
};
