/**
 * Image optimization utilities to improve page load performance
 */

/**
 * Sets up lazy loading for images using IntersectionObserver
 */
export const optimizeImageLoading = () => {
  // Ensure this code runs only in the browser environment
  if (typeof window === "undefined") return () => {};

  // Check if IntersectionObserver is available
  if (!("IntersectionObserver" in window)) {
    console.warn("IntersectionObserver not supported in this browser");
    return () => {};
  }

  // Create an observer for lazy loading images
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          // Replace data-src with src when image comes into view
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img); // Stop observing after the image is loaded
          }
        }
      });
    },
    {
      rootMargin: "200px 0px", // Start loading images 200px before they come into view
      threshold: 0.01, // Trigger when even a small part of the image is visible
    }
  );

  // Observe all images with a data-src attribute for lazy loading
  const lazyImages = document.querySelectorAll("img[data-src]");
  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });

  // Add 'loading=lazy' attribute to all images that support it
  if ("loading" in HTMLImageElement.prototype) {
    document.querySelectorAll("img").forEach((img: HTMLImageElement) => {
      if (!img.hasAttribute("loading")) {
        img.loading = "lazy"; // Use native lazy loading for supported browsers
      }
    });
  }

  // Return cleanup function to disconnect the observer when no longer needed
  return () => {
    lazyImages.forEach((img) => {
      imageObserver.unobserve(img); // Stop observing all images
    });
  };
};

/**
 * Handles broken image placeholders
 */
export const handleBrokenImages = () => {
  // Ensure this code runs only in the browser environment
  if (typeof window === "undefined") return () => {};

  // Default image to use as a fallback for broken images
  const defaultImage = "/placeholder.svg";

  // Set fallback for broken images
  const handleError = (event: Event) => {
    const img = event.target as HTMLImageElement;

    // Prevent infinite loop if fallback image also fails
    if (img.src !== defaultImage) {
      img.src = defaultImage;
      img.alt = "Image not found";
      img.classList.add("broken-image"); // Add a class to handle broken image styles
    }
  };

  // Add error handler to all existing images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", handleError);
  });

  // Add error handler to new images as they are added to the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;

          // Check if the new element is an image and add error handler
          if (element.tagName === "IMG") {
            element.addEventListener("error", handleError);
          }

          // Add error handler to any img elements inside newly added nodes
          element.querySelectorAll("img").forEach((img) => {
            img.addEventListener("error", handleError);
          });
        }
      });
    });
  });

  // Observe changes to the DOM to handle dynamically added images
  observer.observe(document.body, { childList: true, subtree: true });

  // Return cleanup function to disconnect the observer and remove event listeners
  return () => {
    observer.disconnect(); // Stop observing DOM mutations
    document.querySelectorAll("img").forEach((img) => {
      img.removeEventListener("error", handleError); // Remove error handler from images
    });
  };
};
