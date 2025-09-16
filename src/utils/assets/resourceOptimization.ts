/**
 * Resource optimization utilities to improve page load performance
 */

/**
 * Defers loading of non-critical resources to improve page load speed.
 */
export const deferNonCriticalResources = () => {
  // Ensure this code runs only in the browser environment
  if (typeof window === "undefined") return () => {};

  // List of non-critical resource types to defer loading
  const resourcesToDefer = [
    { selector: 'link[rel="preconnect"]', delay: 1000 }, // Preconnect links
    { selector: 'link[rel="dns-prefetch"]', delay: 1000 }, // DNS prefetch links
  ];

  // Create a timeout to handle resource deferring after the initial load
  const timeout = setTimeout(() => {
    resourcesToDefer.forEach(({ selector, delay }) => {
      // Select all matching resource elements
      const elements = document.querySelectorAll(selector);

      elements.forEach((element, index) => {
        const clonedElement = element.cloneNode(true); // Clone the element to preserve the attributes
        const parentNode = element.parentNode;

        if (parentNode) {
          // Remove the original element from the DOM to prevent immediate loading
          parentNode.removeChild(element);

          // Re-append the cloned element after a specified delay to defer loading
          setTimeout(() => {
            parentNode.appendChild(clonedElement);
          }, delay + index * 100); // Stagger loading to avoid race conditions
        }
      });
    });
  }, 0);

  // Return a cleanup function to clear the timeout if necessary
  return () => clearTimeout(timeout);
};
