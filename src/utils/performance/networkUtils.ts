/**
 * Utilities for optimizing network-related performance
 */

/**
 * Optimizes network requests based on the user's connection type.
 * @returns {Function} A cleanup function to remove event listeners.
 */
export const optimizeNetworkRequests = () => {
  /**
   * Handles network connection changes and adjusts content accordingly.
   */
  const connectionHandler = () => {
    // Safely check if the connection API is available
    const connection =
      "connection" in navigator ? (navigator as any).connection : null;

    if (connection) {
      // Adjust content quality based on connection type
      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      ) {
        document.body.classList.add("low-data-mode");

        // Switch to lower quality images when on a slow connection
        document.querySelectorAll("img[data-low-src]").forEach((img) => {
          const image = img as HTMLImageElement;
          if (image.dataset.lowSrc) {
            image.src = image.dataset.lowSrc;
          }
        });
      }
    }
  };

  // Run immediately to adjust content based on current connection
  connectionHandler();

  // Add event listener for connection changes if the connection API is available
  if ("connection" in navigator) {
    const connection = (navigator as any).connection;
    connection.addEventListener("change", connectionHandler);

    // Return cleanup function to remove event listener
    return () => {
      connection.removeEventListener("change", connectionHandler);
    };
  }

  // Return a no-op function if the connection API is not available
  return () => {};
};
