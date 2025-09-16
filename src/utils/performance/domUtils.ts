/**
 * DOM-related performance optimization utilities
 */
import { useEffect, useRef, useState } from "react";

/**
 * Check if an element is currently in the viewport
 * @param {HTMLElement} element - The DOM element to check
 * @returns {boolean} - True if the element is in the viewport, false otherwise
 */
export const isElementInViewport = (element: HTMLElement | null): boolean => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();

  // Check if the element is within the viewport
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
};

/**
 * Batch DOM operations for better performance by executing them in the next animation frame
 * @param {Function} checkFn - Function that returns a value to be checked
 * @param {Function} callback - Callback to be executed with the check result
 */
export const batchDomOperations = <T>(
  checkFn: () => T,
  callback: (result: T) => void
): void => {
  // Use requestAnimationFrame to batch operations in the next frame for better performance
  requestAnimationFrame(() => {
    const result = checkFn();
    callback(result);
  });
};

/**
 * Optimize media loading with lazy loading and priority hints
 * @returns {Function} Cleanup function to disconnect the IntersectionObserver
 */
export const optimizeMediaLoading = () => {
  // Create an IntersectionObserver to observe when media elements come into the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Handle images with a data-src attribute for lazy loading
          if (element.tagName === "IMG") {
            const img = element as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
          }

          // Handle videos with a data-src attribute for lazy loading
          if (element.tagName === "VIDEO") {
            const video = element as HTMLVideoElement;
            if (video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
              video.removeAttribute("data-src");
            }
          }

          // Stop observing the element after it has been loaded
          observer.unobserve(element);
        }
      });
    },
    {
      rootMargin: "200px", // Start loading when element is within 200px of the viewport
    }
  );

  // Observe all media elements (images and videos) with a data-src attribute
  const lazyElements = document.querySelectorAll(
    "img[data-src], video[data-src]"
  );
  lazyElements.forEach((element) => {
    observer.observe(element);
  });

  // Apply priority hints to critical above-the-fold images for faster loading
  document.querySelectorAll("img.priority").forEach((img) => {
    (img as HTMLImageElement).fetchPriority = "high";
  });

  // Return cleanup function to disconnect the observer
  return () => {
    observer.disconnect();
  };
};

/**
 * Temporarily remove offscreen elements to reduce memory usage and improve performance
 */
export const purgeOffscreenElements = () => {
  const viewport = {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
    buffer: 1000, // 1000px buffer zone before considering an element offscreen
  };

  // Find and purge offscreen elements
  document.querySelectorAll("[data-purgeable]").forEach((el) => {
    const element = el as HTMLElement;
    const rect = element.getBoundingClientRect();
    const elemTop = rect.top + window.scrollY;
    const elemBottom = rect.bottom + window.scrollY;

    // If element is far from the viewport (outside the buffer zone)
    if (
      elemBottom < viewport.top - viewport.buffer ||
      elemTop > viewport.bottom + viewport.buffer
    ) {
      // Store original content and replace it with a placeholder
      if (!element.dataset.purged) {
        element.dataset.purgedContent = element.innerHTML;
        element.dataset.purged = "true";
        element.innerHTML = ""; // Remove the content to reduce memory usage
        element.style.minHeight = `${rect.height}px`; // Maintain layout consistency
      }
    } else {
      // Restore content when the element is near the viewport
      if (element.dataset.purged) {
        if (element.dataset.purgedContent) {
          element.innerHTML = element.dataset.purgedContent;
        }
        element.removeAttribute("data-purged");
        element.removeAttribute("data-purged-content");
        element.style.minHeight = ""; // Remove the placeholder height
      }
    }
  });
};
