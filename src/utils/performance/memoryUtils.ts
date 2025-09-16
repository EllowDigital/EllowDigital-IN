/**
 * Utilities for optimizing memory performance
 */
import { purgeOffscreenElements } from "./domUtils";

/**
 * Monitors memory usage and optimizes the DOM when necessary.
 * @returns {Function} A cleanup function to stop monitoring.
 */
export const monitorMemoryUsage = () => {
  const MEMORY_CHECK_INTERVAL = 30000; // 30 seconds

  /**
   * Checks memory usage and purges offscreen elements if necessary.
   */
  const checkMemory = () => {
    // Use the performance.memory API if available (currently works in Chrome only)
    const performance = window.performance as any;

    if (performance && performance.memory) {
      const { usedJSHeapSize, jsHeapSizeLimit } = performance.memory;
      const memoryUsageRatio = usedJSHeapSize / jsHeapSizeLimit;

      // If memory usage exceeds 70%, attempt optimization
      if (memoryUsageRatio > 0.7) {
        console.warn("High memory usage detected. Optimizing...");

        // Temporarily remove offscreen elements from the DOM
        purgeOffscreenElements();
      }
    }
  };

  // Set up memory checks at regular intervals
  const intervalId = setInterval(checkMemory, MEMORY_CHECK_INTERVAL);

  // Return a cleanup function to stop monitoring
  return () => {
    clearInterval(intervalId);
  };
};
