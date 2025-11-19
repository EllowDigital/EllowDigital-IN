/**
 * React performance optimization hooks
 */
import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to track the render count of a component during development.
 * @param {string} componentName - The name of the component to track.
 * @returns {void}
 */
export const useRenderCount = (componentName: string): void => {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`${componentName} render count: ${renderCount}`);
    }
  }, [renderCount, componentName]);
};

/**
 * Custom hook to defer expensive calculations until after paint.
 * @param {Function} callback - The expensive calculation to perform.
 * @param {Array<any>} dependencies - Dependencies array for the calculation.
 * @returns {T | null} The result of the deferred calculation.
 */
export const useDeferredCalculation = <T>(
  callback: () => T,
  dependencies: Array<unknown>
): T | null => {
  const [result, setResult] = useState<T | null>(null);

  useEffect(() => {
    // Use requestIdleCallback if available, otherwise use setTimeout
    const executeInIdle =
      window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

    const handle = executeInIdle(() => {
      const calculationResult = callback();
      setResult(calculationResult);
    });

    return () => {
      if (window.requestIdleCallback) {
        window.cancelIdleCallback(handle as number);
      } else {
        clearTimeout(handle);
      }
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return result;
};

/**
 * Custom hook to throttle expensive rendering operations.
 * @param {T} value - The value or function that might change rapidly.
 * @param {number} limit - Throttle limit in milliseconds.
 * @returns {T} The throttled value.
 */
export const useThrottledValue = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdate = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    const timeUntilUpdate = lastUpdate.current + limit - now;

    if (timeUntilUpdate <= 0) {
      // Update immediately if enough time has passed
      lastUpdate.current = now;
      setThrottledValue(value);
    } else if (timeoutRef.current === null) {
      // Schedule update if not already scheduled
      timeoutRef.current = window.setTimeout(() => {
        lastUpdate.current = Date.now();
        setThrottledValue(value);
        timeoutRef.current = null;
      }, timeUntilUpdate);
    }

    // Clean up timeout on unmount or re-render
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, limit]);

  return throttledValue;
};
