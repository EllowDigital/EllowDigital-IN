/**
 * Scroll performance optimization utilities
 */

/**
 * Optimizes scroll performance using passive listeners and requestAnimationFrame for throttling.
 * @returns {Function} A cleanup function to remove the scroll event listener.
 */
export const optimizeScrollPerformance = () => {
  let ticking = false;
  const scrollElements: HTMLElement[] = [];

  // Select all elements that have a scroll effect
  document.querySelectorAll("[data-scroll-effect]").forEach((el) => {
    scrollElements.push(el as HTMLElement);
  });

  /**
   * Handles the scroll event and applies scroll effects to elements.
   */
  const scrollHandler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Apply effects to elements based on their scroll position
        scrollElements.forEach((el) => {
          const effect = el.dataset.scrollEffect;
          const offsetTop = el.offsetTop;
          const viewportHeight = window.innerHeight;

          // Parallax effect
          if (effect === "parallax") {
            const speed = parseFloat(el.dataset.parallaxSpeed || "0.5");
            const yPos = -(scrollY * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
          }

          // Fade-in effect
          if (effect === "fade-in") {
            if (scrollY + viewportHeight > offsetTop) {
              el.classList.add("visible");
            }
          }
        });

        ticking = false;
      });

      ticking = true;
    }
  };

  // Add passive scroll event listener for better performance
  window.addEventListener("scroll", scrollHandler, { passive: true });

  // Return cleanup function to remove the scroll event listener
  return () => {
    window.removeEventListener("scroll", scrollHandler);
  };
};
